metadata {

  definition(name: "TPLink HS-100", namespace: "arhea", author: "Alex Rhea") {
    capability "Switch"
  }

  tiles {
    standardTile("switchTile", "device.switch", width: 2, height: 2,
                 canChangeIcon: true) {
        state "off", label: '${name}', action: "switch.on",
              icon: "st.switches.switch.off", backgroundColor: "#ffffff"
        state "on", label: '${name}', action: "switch.off",
              icon: "st.switches.switch.on", backgroundColor: "#4CA349"
    }

    main "switchTile"
    details(["switchTile"])
  }

  preferences {
    section("TPLink Hub Information:") {
      input("TPLinkHubHost", "string", title:"The hostname of the TPLink Hub.", description: "Please enter the hostname of the TPLink Hub.", defaultValue: "", required: true, displayDuringSetup: true)
      input("TPLinkHubPort", "string", title:"The port number of the TPLink Hub.", description: "Please enter the port number of the TPLink Hub.", defaultValue: "3000", required: true, displayDuringSetup: true)
    }
  }


}

def installed() {
  log.debug "TPLink Installed with settings: ${settings}"
  initialize()
}


def updated() {
  log.debug "TPLink Updated with settings: ${settings}"
  initialize()
}

def initialize() {
  runEvery5Minutes(updateCurrentStatus)
}

def parse(String description) {
  log.debug "TPLink: Parsing ${description}"

  def msg = parseLanMessage(description)

  log.debug "TPLink: Body ${msg.data}"

  if(msg.data.sysInfo.relay_state == 1) {
    sendEvent(name: "switch", value: "on", descriptionText: "Switch is on")
  } else {
    sendEvent(name: "switch", value: "off", descriptionText: "Switch is off")
  }

}

def on() {
  log.debug "TPLink: Turn On ${device.name}"

  def result = new physicalgraph.device.HubAction(
    method: "GET",
    path: "/plugs/${device.deviceNetworkId}/on",
    headers: [
      HOST: "${TPLinkHubHost}:${TPLinkHubPort}"
    ]
  )
}

def off() {
  log.debug "TPLink: Turn Off ${device.name}"

  def result = new physicalgraph.device.HubAction(
    method: "GET",
    path: "/plugs/${device.deviceNetworkId}/off",
    headers: [
      HOST: "${TPLinkHubHost}:${TPLinkHubPort}"
    ]
  )
}

def updateCurrentStatus() {
  log.debug "TPLink: Poll ${device.name}"

  def result = new physicalgraph.device.HubAction(
    method: "GET",
    path: "/plugs/${device.deviceNetworkId}",
    headers: [
      HOST: "${TPLinkHubHost}:${TPLinkHubPort}"
    ]
  )
}
