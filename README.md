# bajo-serialport

Plugin name: **bajoSerialport**, alias: **sp**

![GitHub package.json version](https://img.shields.io/github/package-json/v/ardhi/bajo-serialport) ![NPM Version](https://img.shields.io/npm/v/bajo-serialport)

> <br />**Attention**: I do NOT accept any pull request at the moment, thanks!<br /><br />

Serialport binding for [Bajo](https://github.com/ardhi/bajo). If [Bajo Emitter](https://github.com/ardhi/bajo-emitter) is loaded, events & messages are also handled through Bajo Emitter processing system.

## Installation

Goto your ```<bajo-base-dir>``` and type:

```bash
$ npm install bajo-serialport
```

Now open your ```<bajo-data-dir>/config/.plugins``` and put ```bajo-serialport``` in it
. Order doesn't matter here, but you should put it below ```bajo-emitter```:

```
...
bajo-emitter
bajo-serialport
...
```

## Configuration

Open/create ```<bajo-data-dir>/config/bajoSerialport.json```:

| Key | Type | Required | Default | Description |
| --- | ---- | -------- | ------- | ----------- |
| ```connections``` | ```array``` | no | ```[]``` | Define one or more connections |
| &nbsp;&nbsp;```name``` | ```string``` | no | ```default``` | Connection name, must be unique among all your connections |
| &nbsp;&nbsp;```path``` | ```string``` | yes || Path name, e.g: ```/dev/tty-usbserial1``` |
| &nbsp;&nbsp;```baudRate``` | ```integer``` | no | ```38400``` | Baudrate |
| &nbsp;&nbsp;```parser``` | ```string/object``` | no | ReadlineParser | Serialport parser |
| &nbsp;&nbsp;```broadcast``` | ```boolean``` | no | ```false``` | Incoming messages are broadcastable by ```bajoEmitter``` |

Example:

```json
{
  "connections": [{
    "name": "usb1",
    "path": "/dev/tty-usbserial1",
    "baudRate": 9600,
    "broadcast": true
  }]
}
```

## Hook

- ```bajoSerialport:onParserData (conn, message)```
- ```bajoSerialport:onPortClose (conn)```
- ```bajoSerialport:onPortError (conn, error)```
- ```bajoSerialport:onPortOpen (conn)```

## License

[MIT](LICENSE)