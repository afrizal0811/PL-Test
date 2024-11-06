import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          // type: "LiveStream",
          constraints: {
            height: 300,
            facingMode: "environment",
          },
          // area: {
          //   // defines rectangle of the detection/localization area
          //   top: "100%", // top offset
          //   right: "100%", // right offset
          //   left: "100%", // left offset
          //   bottom: "100%", // bottom offset
          // },
        },
        // locator: {
        //   halfSample: true,
        //   patchSize: "x-small", // x-small, small, medium, large, x-large
        //   debug: {
        //     showCanvas: true,
        //     showPatches: false,
        //     showFoundPatches: false,
        //     showSkeleton: false,
        //     showLabels: false,
        //     showPatchLabels: false,
        //     showRemainingPatchLabels: false,
        //     boxFromPatches: {
        //       showTransformed: true,
        //       showTransformedBox: true,
        //       showBB: true,
        //     },
        //   },
        // },
        numOfWorkers: 0,
        decoder: {
          readers: ["code_128_reader"],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
        },
        locate: true,
        multiple: false,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  _onDetected = (result) => {
    this.props.onDetected(result);
  };

  render() {
    return <div id="interactive" className="viewport" />;
  }
}

export default Scanner;
