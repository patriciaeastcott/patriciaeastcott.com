def detect_automation(events):
    # Simplified mock logic for automation detection
    suggestions = []
    click_count = sum(1 for event in events if event['type'] == 'click')
    if click_count > 5:
        suggestions.append({
            'description': 'Automate repetitive clicks with a script',
            'roi': 70
        })
    return suggestions