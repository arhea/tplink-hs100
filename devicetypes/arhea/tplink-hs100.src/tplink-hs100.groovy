metadata {

  definition(name: "TPLink HS-100", namespace: "arhea", author: "Alex Rhea") {
    capability "Switch"
  }

  tiles() {
    standardTile("switchTile", "device.switch", width: 3, height: 2,
                 canChangeIcon: true) {
        state "off", label: '${name}', action: "switch.on",
              icon: "st.Appliances.appliances17", backgroundColor: "#ffffff"
        state "on", label: '${name}', action: "switch.off",
              icon: "st.Appliances.appliances17", backgroundColor: "#86BF34"
    }

    main "switchTile"
    details(["switchTile", "refreshTile"])
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
  parent.tplinkTurnOnPlug(device)
}

def handleOn() {
  log.debug "[TPLink][Device][Action] - Handle On ${device.name}"
  sendEvent(name: "switch", value: "on")
}

def off() {
  log.debug "[TPLink][Device][Action] - Turn Off ${device.name}"
  parent.tplinkTurnOffPlug(device)
}

def handleOff() {
  log.debug "[TPLink][Device][Action] - Handle Off ${device.name}"
  sendEvent(name: "switch", value: "off")
}

def refresh() {
  log.debug "[TPLink][Device][Action] - Refresh ${device.name}"
  parent.tplinkTurnOnPlug(device)
}
