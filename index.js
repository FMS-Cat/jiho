const say = require( 'say' );

const voice = (
  process.platform === 'darwin' ? 'Samantha' :
    process.platform === 'win32' ? 'Microsoft Zira Desktop' :
      null
);

const hour = ( date ) => {
  const h = date.getHours();

  // return 12 if it's twelve, otherwise return the hour in 12-hour format
  return ( h % 12 ) === 0 ? '12' : ( h % 12 ).toString();
};

let prevDate = new Date(); // logically no problem

say.speak( 'Hello.', voice );

const update = () => {
  let now = new Date();
  let nowMin = now.getMinutes();
  if (
    ( prevDate.getMinutes() !== nowMin ) &&
    ( nowMin % 15 === 0 )
  ) {
    if ( nowMin === 0 ) {
      say.speak( hour( now ), voice );
    } else {
      say.speak( hour( now ) + ':' + nowMin.toString(), voice );
    }
  }
  prevDate = now;

  setTimeout( update, 1000 );
};
update();