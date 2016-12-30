metadata {

  definition(name: "TPLink HS-100", namespace: "arhea", author: "Alex Rhea") {
    capability "Switch"
  }

  tiles() {

    standardTile("switchTile", "device.switch", width: 3, height: 2, canChangeIcon: true) {
      state "off", label: 'Off', action: "switch.on",
        icon: "st.Appliances.appliances17", backgroundColor: "#ffffff"
      state "on", label: 'On', action: "switch.off",
        icon: "st.Appliances.appliances17", backgroundColor: "#86BF34"
      state "turningOn", label: 'Turning On', action: "switch.on",
        icon: "st.Appliances.appliances17", backgroundColor: "#ffffff"
      state "turningOff", label: 'Turning Off', action: "switch.off",
        icon: "st.Appliances.appliances17", backgroundColor: "#86BF34"
    }

    valueTile("timeTile", "on_time", width: 1, height: 1, decoration: "flat") {
      state "on", label:'${currentValue} seconds'
      state "off", label:'N/A'
    }

    main "switchTile"
    details(["switchTile", "timeTile"])
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
  sendEvent(name: "switch", value: "turningOn", descriptionText: "${device.name} is turning on.")
  parent.tplinkTurnOnPlug(device)
}

def handleOn() {
  log.debug "[TPLink][Device][Action] - Handle On ${device.name}"
  sendEvent(name: "switch", value: "on", descriptionText: "${device.name} turned on.")
}

def off() {
  log.debug "[TPLink][Device][Action] - Turn Off ${device.name}"
  sendEvent(name: "switch", value: "turningOff", descriptionText: "${device.name} is turning off.")
  parent.tplinkTurnOffPlug(device)
}

def handleOff() {
  log.debug "[TPLink][Device][Action] - Handle Off ${device.name}"
  sendEvent(name: "switch", value: "off", descriptionText: "${device.name} turned off.")
}

def handleOnTime(value) {
  log.debug "[TPLink][Device][Action] - Handle On Time ${device.name}"
  sendEvent(name: "on_time", value: value, descriptionText: "${device.name} has been on for ${value} seconds.")
}

def refresh() {
  log.debug "[TPLink][Device][Action] - Refresh ${device.name}"
  parent.tplinkGetPlug(device)
}
