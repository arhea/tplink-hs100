metadata {

  definition(name: "TPLink HS-100", namespace: "arhea", author: "Alex Rhea") {
    capability "Switch"
  }

  tiles(scale: 2) {

    multiAttributeTile(name:"switch", type: "lighting", width: 6, height: 4, canChangeIcon: true){

      tileAttribute ("device.switch", key: "PRIMARY_CONTROL") {
        state "on", label: 'On', action: "switch.off", icon: "st.switches.switch.on", backgroundColor: "#79b821", nextState: "turningOff"
        state "off", label: 'Off', action: "switch.on", icon: "st.switches.switch.off", backgroundColor: "#ffffff", nextState: "turningOn"
        state "turningOn", label: 'Turning On', action: "switch.off", icon: "st.switches.switch.on", backgroundColor: "#79b821", nextState: "on"
        state "turningOff", label: 'Turning Off', action: "switch.on", icon: "st.switches.switch.off", backgroundColor: "#ffffff", nextState: "off"
      }

      tileAttribute ("device.data.on_time", key: "SECONDARY_CONTROL") {
        state "default", label:'${currentValue} s'
      }
    }

    standardTile("refresh", "device.data.on_time", inactiveLabel: false, decoration: "flat", width: 2, height: 2) {
      state "default", label:"", action:"refresh.refresh", icon:"st.secondary.refresh"
    }

    main "switch"
    details(["switch","refresh"])

  }

}

def installed() {
  log.debug "[TPLink][Device][Installed] - ${settings}"
  initialize()
}

def updated() {
  log.debug "[TPLink][Device][Updated] - ${settings}"
  initialize()
}

def initialize() {
  log.debug "[TPLink][Device][Init] - ${settings}"
  runEvery5Minutes(refresh)
}

def parse(description) {

}

def on() {
  log.debug "[TPLink][Device][Action] - Turn On ${device.name}"
  sendEvent(name: "switch", value: "turningOn")
  parent.tplinkTurnOnPlug(device)
}

def handleOn() {
  log.debug "[TPLink][Device][Action] - Handle On ${device.name}"
  sendEvent(name: "switch", value: "on")
}

def off() {
  log.debug "[TPLink][Device][Action] - Turn Off ${device.name}"
  sendEvent(name: "switch", value: "turningOff")
  parent.tplinkTurnOffPlug(device)
}

def handleOff() {
  log.debug "[TPLink][Device][Action] - Handle Off ${device.name}"
  sendEvent(name: "switch", value: "off")
}

def refresh() {
  log.debug "[TPLink][Device][Action] - Refresh ${device.name}"
  parent.tplinkGetPlug(device)
}
