export namespace Passive {
	type Id = number;
	type PositionX = number;
	type PositionY = number;
	type Arc = number;
	type Location = [PositionX, PositionY, Arc];
	type TextValue = { [key: string]: string };
	type SkillSprite = [number, number, number, number];

	interface Node {
		A: Location;
		a: Id; // id
		b?: string; // icon
		c?: boolean; // ks
		d?: boolean; // not
		e?: string; // dn
		f?: boolean; // m
		g?: boolean; // isJewelSocket
		h?: boolean; // isMultipleChoice
		i?: boolean; // isMultipleChoiceOption
		j?: number; // passivePointsGranted
		k?: Id[]; // spc
		l?: TextValue[]; // sd
		m?: number; // g
		// n?: number; // o
		// o?: boolean; // oidx
		p?: number; // sa
		q?: number; // da
		r?: number; // ia
		s?: Id[]; // out
		t?: string; // reminderText
		u?: string; // ascendancyName
		v?: boolean; // isAscendancyStart
		w?: boolean; // isAscendancy
		x?: string[]; // flavourText
		y?: Id[]; // in
		z: SkillSprite;
	}
}
