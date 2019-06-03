import dayjs from 'dayjs';

function datePipe(date: string) {
	return dayjs(date).format('YYYY-MM-DD HH:mm');
}

export default datePipe;
