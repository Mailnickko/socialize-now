// Input: @givenTime => String
// Output: String => Human Readable Time
export const formatTime = function(givenTime) {
  let timeArr = givenTime.split(':');
  let hour = timeArr[0];
  let min = timeArr[1];
  if (parseInt(hour) === 12) {
    return givenTime + ' PM';
  } else if (parseInt(hour) > 12) {
    return (parseInt(hour) - 12) + ':' + min + ' PM';
  } else {
    return givenTime + ' AM';
  }
}
