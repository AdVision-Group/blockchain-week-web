function isMirror(host) {
	return host === 'mirror.explore.prgblockweek.com';
}

export async function load(entry = '23', host = null) {
	const resp = await fetch(`https://advision-group.github.io/blockchain-week-data/23/index.json`);
	const data = await resp.json();
	data.events.sort((a, b) => ((a.attendees || 0) < (b.attendees || 0) ? 1 : -1));
	//console.log(data.events)
	data.speakers = [];
	for (const event of data.events) {
		if (!event.speakers) continue;
		for (const speaker of event.speakers) {
			if (!speaker.name) continue;
			speaker.events = [event.id];
			data.speakers.push(speaker);
		}
	}
	return data;
}

export async function loadSchema() {
	const resp = await fetch(
		`https://advision-group.github.io/blockchain-week-data/schema/1/bundle.json`
	);
	return resp.json();
}
