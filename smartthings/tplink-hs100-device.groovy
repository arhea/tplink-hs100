metadata {

  definition(name: "TPLink HS-100", namespace: "arhea", author: "Alex Rhea") {
    capability "Outlet"
    capability "Polling"
  }

  tiles {
    standardTile("switchTile", "device.switch", width: 4, height: 4,
                 canChangeIcon: true) {
        state "off", label: '${name}', action: "switch.on",
              icon: "st.switches.switch.off", backgroundColor: "#ffffff"
        state "on", label: '${name}', action: "switch.off",
              icon: "st.switches.switch.on", backgroundColor: "#E60000"
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

def parse(String description) {
  log.debug "TPLink: ${description}"
}

def on() {
  log.debug "TPLink: Turn On ${device.name}"

  try {
    httpGet([ uri: "http://${TPLinkHubHost}:${TPLinkHubPort}", path: "/plugs/${device.deviceNetworkId}/on" ]) { resp ->
      log.debug "TPLink: Turn On Response ${resp.data}"
    }
    sendEvent(name: "switch", value: "on")
  } catch (e) {
    log.error "TPLink Error: $e"
  }
}

def off() {
  log.debug "TPLink: Turn Off ${device.name}"

  try {
    httpGet([ uri: "http://${TPLinkHubHost}:${TPLinkHubPort}", path: "/plugs/${device.deviceNetworkId}/off" ]) { resp ->
      log.debug "TPLink: Turn Off Response ${resp.data}"
    }
    sendEvent(name: "switch", value: "off")
  } catch (e) {
    log.error "TPLink Error: $e"
  }
}

def poll() {
  log.debug "TPLink: Poll ${device.name}"

  try {

    httpGet([ uri: "http://${TPLinkHubHost}:${TPLinkHubPort}", path: "/plugs/${device.deviceNetworkId}" ]) { resp ->
      log.debug "TPLink: Turn Off Response ${resp.data}"

      if(resp.data.sysInfo.relay_state == 1) {
        sendEvent(name: "switch", value: "on")
      } else {
        sendEvent(name: "switch", value: "off")
      }

    }

  } catch (e) {
    log.error "TPLink Error: $e"
  }
}

