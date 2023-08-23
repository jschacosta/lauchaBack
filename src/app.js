import server from './server.js';

const port = process.env.PORT || 4000;
server.listen(port, function () {
  console.log('SOS API TRAVELERS is listening on port '+ port + ' AGUANTE LA U !!');
});