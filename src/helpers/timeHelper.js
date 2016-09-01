import moment from 'moment';

function hours(duration) {
  return format(duration.hours());
}

function minutes(duration) {
  return format(duration.minutes());
}

function seconds(duration) {
  return format(duration.seconds());
}

function milliseconds(duration) {
  return format(duration.milliseconds());
}

function format(duration) {
  if (!duration) {
    return '00';
  } else if (('' + duration).length == 1) {
    return '0' + duration;
  } else if (('' + duration).length == 3) {
    return ('' + duration).slice(0, 2);
  } else {
    return duration;
  }
}

export function formatDuration(length) {
  if (!length) {
    return '00:00:00';
  }

  let duration = moment.duration(length);
  let formattedDuration = '';

  formattedDuration += hours(duration) + ':';
  formattedDuration += minutes(duration) + ':';
  formattedDuration += seconds(duration);

  return formattedDuration;
}

export function formatTime(date) {
  return moment(date).format('HH:mm:ss');
}

export function formatDate(date) {
  return moment(date).format('DD/MM/YYYY');
}
