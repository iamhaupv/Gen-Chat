import React from 'react'

export default function CallScreen() {
  return (
    <div>
      <p id="txtToken">
    </p>
    <p id="txtCallerID">
    </p>
    <p id="txtTypeOfRequest">
    </p>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="jumbotron">
                    <div class="container">
                        <h2 id="txtCalleeID">
                        </h2>
                    </div>
                </div>

                <div id="video-container">
                    <video id="localVideo" autoplay muted></video>
                    <video id="remoteVideo" autoplay style={{height: "360px"}}></video>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col" id="action-buttons">
                <button id="btnEndCall" class="btn btn-danger">End Call</button>
            </div>

        </div>
    </div>
    </div>
  )
}
