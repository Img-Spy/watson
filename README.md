# Watson 
*Watson* is a generic cross-platform digital-forensics tool aimed to cross the 
results of different techniques from diverse digital forensic branches in order
to gather advanced evidences.

Special thanks to [ANFORA](#ANFORA).


## Development

In order to execute the application in development mode just run:

```bash
npx yarn
npx yarn dev
```

After executing the software, you can build the distribution files for Windows,
linux or MacOS using the command:

```bash
npx yarn dist-linux # For Linux
npx yarn dist-win # For Windows
npx yarn dist-mac # For MacOS
```

## Installation

You can find any required file [here](https://github.com/Img-Spy/watson/releases).

### Windows



### Linux

You can download and extract the .tar.gz file and execute watson binary. If
you are using a x64 debian-based distribution, you can install it using the .deb
package

```bash
dpkg -i watson_0.2.0_amd64.deb
```

### MacOS

We are working on packaging the software for MacOS.

## Wiki
For information about the GUI and the plugin management go to our
[wiki](https://github.com/Img-Spy/watson/wiki).

## Future work

We are currently working on:

* Plugin manager to easily add custom plugins.
* Add more plugins for network packet analysis and integrate fingerprint techniques.
* Improve compatibility with MacOS.

## Acknowledgements

This work has been financially supported by the MINECO/FEDER funded project 
"Análisis Forense Avanzado (ANFORA)" TEC2015-68734-R
