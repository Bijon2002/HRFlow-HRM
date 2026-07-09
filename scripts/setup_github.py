import os
import csv
import sys
import argparse
import subprocess
import json

# Milestone mapping
MILESTONES = {
    "Sprint 1": {"due": "2026-06-26T23:59:59Z", "title": "Sprint 1"},
    "Sprint 2": {"due": "2026-07-10T23:59:59Z", "title": "Sprint 2"},
    "Sprint 3": {"due": "2026-07-31T23:59:59Z", "title": "Sprint 3"},
    "Sprint 4": {"due": "2026-08-14T23:59:59Z", "title": "Sprint 4"},
}

# Label color mapping (standard color palette)
LABEL_COLORS = {
    # Component/Tech
    "frontend": "1d76db",
    "backend": "0052cc",
    "ai-service": "b60205",
    "database": "bfd4f2",
    "authentication": "ecc30b",
    "documentation": "0075ca",
    "testing": "5319e7",
    "risk": "d93f0b",
    
    # Standard labels mapping
    "Frontend": "1d76db",
    "Backend": "0052cc",
    "AI": "b60205",
    "Database": "bfd4f2",
    "Authentication": "ecc30b",
    "Bug": "d73a4a",
    "Documentation": "0075ca",
    "Testing": "5319e7",
    "Risk": "d93f0b",
    
    # Priority
    "Highest Priority": "d93f0b",
    "High Priority": "e99695",
    "Medium Priority": "fef2c0",
    "Low Priority": "c5def5",
    
    # Sprint tags
    "Sprint 1": "8f32a8",
    "Sprint 2": "8f32a8",
    "Sprint 3": "8f32a8",
    "Sprint 4": "8f32a8",
}

def parse_csv(csv_path):
    epics = {}
    stories = {}
    tasks = {}
    
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}", file=sys.stderr)
        sys.exit(1)
        
    with open(csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            issue_id = row['Issue ID']
            parent_id = row['Parent ID']
            issue_type = row['Issue Type']
            
            item = {
                'id': issue_id,
                'parent_id': parent_id,
                'type': issue_type,
                'summary': row['Summary'],
                'description': row['Description'],
                'sprint': row['Sprint'],
                'assignee': row['Assignee'],
                'priority': row['Priority'],
                'start_date': row['Start Date'],
                'due_date': row['Due Date'],
                'story_points': row['Story Points'],
                'labels': [l.strip() for l in row['Labels'].split(',') if l.strip()] if row['Labels'] else []
            }
            
            if issue_type == 'Epic':
                epics[issue_id] = item
            elif issue_type == 'Story':
                stories[issue_id] = item
            elif issue_type == 'Task':
                tasks[issue_id] = item
                
    return epics, stories, tasks

def run_command(cmd):
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, shell=True)
    return result.returncode, result.stdout.strip(), result.stderr.strip()

def check_gh_cli():
    code, out, err = run_command("gh auth status")
    if code != 0:
        print("Error: GitHub CLI (gh) is not authenticated or not installed.", file=sys.stderr)
        print("Please run 'gh auth login' to authenticate.", file=sys.stderr)
        return False
    return True

def create_milestones(dry_run=False):
    print("\n--- Processing Milestones ---")
    for sprint, info in MILESTONES.items():
        if dry_run:
            print(f"[Dry-run] Would create Milestone '{info['title']}' due on {info['due']}")
        else:
            # Check if milestone already exists
            code, out, err = run_command(f'gh milestone list --json title')
            exists = False
            if code == 0:
                titles = [m['title'] for m in json.loads(out)]
                if info['title'] in titles:
                    print(f"Milestone '{info['title']}' already exists.")
                    exists = True
            
            if not exists:
                m_code, m_out, m_err = run_command(f'gh milestone create --title "{info["title"]}" --due-date "{info["due"]}"')
                if m_code == 0:
                    print(f"Created Milestone '{info['title']}'")
                else:
                    print(f"Failed to create Milestone '{info['title']}': {m_err}", file=sys.stderr)

def create_labels(dry_run=False):
    print("\n--- Processing Labels ---")
    for name, color in LABEL_COLORS.items():
        if dry_run:
            print(f"[Dry-run] Would create Label '{name}' with color '{color}'")
        else:
            # Create or check label
            code, out, err = run_command(f'gh label create "{name}" --color "{color}" --force')
            if code == 0:
                print(f"Created/Updated Label '{name}'")
            else:
                print(f"Failed to create Label '{name}': {err}", file=sys.stderr)

def build_issue_payloads(epics, stories, tasks):
    payloads = []
    
    # Group tasks by their parent ID
    tasks_by_parent = {}
    for task_id, task in tasks.items():
        parent = task['parent_id']
        if parent:
            tasks_by_parent.setdefault(parent, []).append(task)
            
    for story_id, story in stories.items():
        # Get parent epic
        epic_name = ""
        parent_epic_id = story['parent_id']
        if parent_epic_id in epics:
            epic_name = epics[parent_epic_id]['summary']
            
        title = f"[{epic_name}] {story['summary']}" if epic_name else story['summary']
        
        # Build checklist from subtasks
        checklist = ""
        subtasks = tasks_by_parent.get(story_id, [])
        if subtasks:
            checklist = "\n\n### Tasks Checklist\n"
            for t in sorted(subtasks, key=lambda x: x['id']):
                checklist += f"- [ ] {t['summary']}\n"
                
        body = f"{story['description'] or 'No description provided.'}{checklist}"
        
        # Combine labels
        issue_labels = list(story['labels'])
        
        # Map Priority
        priority_label = f"{story['priority']} Priority" if story['priority'] else ""
        if priority_label:
            issue_labels.append(priority_label)
            
        # Add Sprint to labels if present
        if story['sprint']:
            issue_labels.append(story['sprint'])
            
        # Map Assignee (GitHub username mappings if needed, default to raw csv string)
        # Note: Github CLI issue create uses --assignee <username>
        assignee = story['assignee']
        
        payloads.append({
            'title': title,
            'body': body,
            'assignee': assignee,
            'milestone': story['sprint'] if story['sprint'] in MILESTONES else None,
            'labels': list(set(issue_labels))
        })
        
    return payloads

def create_issues(payloads, dry_run=False):
    print("\n--- Processing Issues ---")
    for payload in payloads:
        title = payload['title']
        body = payload['body']
        assignee = payload['assignee']
        milestone = payload['milestone']
        labels = payload['labels']
        
        labels_str = ",".join([f'"{l}"' for l in labels])
        
        if dry_run:
            print(f"\n[Dry-run] Would create Issue:")
            print(f"  Title: {title}")
            print(f"  Assignee: {assignee}")
            print(f"  Milestone: {milestone}")
            print(f"  Labels: {labels}")
            print(f"  Body length: {len(body)} chars")
            print("  --- Body Preview ---")
            print("\n".join(body.split("\n")[:8]))
            print("  --------------------")
        else:
            # Construct gh CLI issue create command
            cmd = f'gh issue create --title "{title}" --body "{body}"'
            if assignee:
                cmd += f' --assignee "{assignee}"'
            if milestone:
                cmd += f' --milestone "{milestone}"'
            if labels:
                for l in labels:
                    cmd += f' --label "{l}"'
                    
            code, out, err = run_command(cmd)
            if code == 0:
                print(f"Created Issue: {title} -> {out}")
            else:
                print(f"Failed to create Issue: {title}\nError: {err}", file=sys.stderr)

def main():
    parser = argparse.ArgumentParser(description="HR-Flow GitHub Project Setup Package")
    parser.add_argument("--csv", default="docs/jira_import.csv", help="Path to Jira import CSV file")
    parser.add_argument("--dry-run", action="store_true", help="Print actions instead of executing them")
    args = parser.parse_args()
    
    csv_path = args.csv
    dry_run = args.dry_run
    
    print(f"Starting GitHub Setup Package...")
    print(f"CSV Path: {csv_path}")
    print(f"Dry Run: {dry_run}")
    
    if not dry_run:
        if not check_gh_cli():
            print("Aborting. Please log in with `gh auth login`.", file=sys.stderr)
            sys.exit(1)
            
    epics, stories, tasks = parse_csv(csv_path)
    print(f"\nParsed {len(epics)} Epics, {len(stories)} Stories, and {len(tasks)} Tasks.")
    
    create_labels(dry_run)
    create_milestones(dry_run)
    
    payloads = build_issue_payloads(epics, stories, tasks)
    create_issues(payloads, dry_run)
    
    print("\nGitHub Project Setup complete!")

if __name__ == "__main__":
    main()
