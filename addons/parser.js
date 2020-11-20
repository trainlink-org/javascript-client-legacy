function trainlinkParser() {
    function parse(packet) {
        if (packet == "<credits>") {
            console.log("Credits")
            return credits()
        } else {
        packetKey = packet[1];
        if (packetKey == ' ') {
            packetKey = packet[2];
        }
        var fullpacket = packet
        packet = packet.split(" ");
        switch (packetKey) {
            // Cab control
            case ("t"):
                trainlink.setSpeed(packet[2],packet[3],parseInt(packet[4].substring(0, packet[4].length-1)));
                break;
                
            // Track power off
            case ('0') :
                trainlink.setPower(0);
                break;

            // Track power on
            case ('1') :
                trainlink.setPower(1);
                break;

            // New cab functions
            case ('F'):
                return NaN;
            
            // Legacy cab functions
            case ('f'):
                trainlink.sendCommand(fullpacket)
            
            // Turnouts
            case ('T'): //Not fully finished
                if (packet.length == 4) {
                    turnouts.push({id: packet[1], address: packet[2], subaddress: packet[3], throw: 0})
                    return '<O>';
                } else if (packet.length == 2) {
                    var i;
                    for (i=0; i<turnouts.length; i++ ) {
                        if (turnouts[i]['id'] == packet[1].substring(0, packet[1].length-1)) {
                            turnouts.splice(i, 1);
                            return 'O';
                        }
                    }
                    return 'X';
                } else if (packet.length == 1) {
                    returnList = [];
                    if (turnouts.length > 0) {
                        for (i=0; i<turnouts.length; i++){
                            returnList.push('H '+turnouts[i]['id']+' '+turnouts[i]['address']+' '+turnouts[i]['subaddress']+' '+turnouts[i]['throw']);
                        }
                    return returnList;
                    }
                    return 'X';
                }
            }
        }
    }

    trainlinkParser.parse = parse;
}