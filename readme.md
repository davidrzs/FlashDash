# Dashboard

Dashboard is a simple to use personal dashboard that can display a variety of information.
 ![dashboard screenshot](./screenshot.png)

## Features

The dashboard can show the following things:

- weather for the next three days
- news from a wide range of sources
- date and time
- temperature or related time series data from a REST-API
- more coming soon..

## Installation and Usage

IMPORTANT: Since this project is still under active development things will change & break.

#### Prerequisites
- Python
- Python Dependencies --> more info will be added
- Webbrowser (preferrably Chrome/Chromium since it doesn't look as polishes in Edge or Firefox )

#### Installation
1. Fork, clone or download this repository into a directory on your computer
2. Create a file called `config.yaml` in the same folder. It should be on the same level in the filesystem as the file `webserver.py`.
3. Enter your API Keys into the `config.yaml`

#### Usage
1. Open `index.html` in your browser.
2. Open your terminal and type `python webserver.py`

Now, after waiting for a couple of seconds for everything to set up, your dashboard is running.

## Background of the project

This project has been written to transform an old LCD screen we had lying around our office into a modern dashboard using a RaspberryPi. Despite not containing any tests and having some rough edges, this side project will be maintained by us (and not be left to rot by itself).


## Technical info
coming soon.


## License

The code which has been written by me, David Zollikofer, is owned by my employer Innovista Management GmbH. Nevertheless, the source code is licensed under the very liberal MIT license. [The license can be found in the LICENSE.md file](./LICENSE.md)
