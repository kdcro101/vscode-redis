# Redis console 

Redis console for Visual Studio Code provides you to ability to execute Redis commands in Visual Studio Code.


## Features

- all commands supported (217 commands)
- includes command reference
- easily accessed command log (history)
- configuration at wokspace level
- trying to JSON.stringify response to provide easy-to-read data display

<p align="center">
   <img  src="https://raw.githubusercontent.com/kdcro101/vscode-redis/master/media/0.jpg" />
</p>

<p align="center">
   <img  src="https://raw.githubusercontent.com/kdcro101/vscode-redis/master/media/1.jpg" />
</p>

## Configuration

`redis-console.host`

`[string]` Hostname or IP address of Redis instance. Default: `localhost`

`redis-console.port`

`[number]` Listening port of Redis instance. Default: `6379`

`redis-console.password`

`[string]` Password to use when connection to Redis instance. Leave blank if no password is used. Default `""`

`redis-console.hostIpFamily`

`[number]` IP protocol version used when connecting. Can be `4` or `6`. Default `4`


## Usage guide

 - type command into input box and press ENTER to execute
 - to open history, focus to input box on bottom of panel and press up-arrow (↑)
 - to execute command from histroy, click an item or select item with arrow keys and press enter
 - to copy command from histroy into input box, select item with arrow keys and press TAB. History panel will close, so you can modify and execute command
