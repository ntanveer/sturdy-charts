# Sturdy Charts
This is a d3 based reusable chart library. The idea is to provide sturdy charts which do not require you to buy any third party product.

## How to start
Assuming you already have node installed. You just need to do the following to run the sample application. Alternatively feel free to dive straight into the src folder and copy the ouput to your application.

- Open command prompt and navigate to your cloned folder.
- If http-server is already installed then type, http-server to start the server.
- Navigate to localhost:8080 in the browser of your choice.

For first time use you will need to install http-server
```JavaScript
npm install http-server -g
http-server
```

If you want to generate the source then a gulp task is included in the src folder. 

You will need to install gulp and depencies in the same folde as per the folllowing command.

```JavaScript
npm install --save gulp gulp-concat gulp-jshint gulp-rename gulp-sass gulp-uglify gulp-util
```

Then just type gulp from command line
```cmd
gulp
```

## LICENSE

(MIT License)

Copyright (c) 2016 Nabeel Tanveer <nabeel.tanveer@outlook.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.