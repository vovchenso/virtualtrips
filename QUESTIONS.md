# Questions

Q1: Explain the output of the following code and why

```js
    setTimeout(function() {
      console.log("1");
    }, 100);
    console.log("2");
```

_The output will be:_
```
2
1
```
_It happens because we have `setTimeout` which will add callback to the queue and will execute it when the main call stack will become empty_


Q2: Explain the output of the following code and why

```js
    function foo(d) {
      if(d < 10) {
        foo(d+1);
      }
      console.log(d);
    }
    foo(0);
```

_Here we have recursive call of function `foo` so the output will be `10 9 8 7 6 5 4 3 2 1 0`_
_It happens because when we call `foo` with argument 0 it will pass the condition `d < 10` and so will call `foo` with increased value and so it will be added to the call stack. It will be happening until value will hit 10. After that JS will continue execution down each item in the stack_

Q3: If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```js
    function foo(d) {
      d = d || 5;
      console.log(d);
    }
```

_The issue will be if we will pass `0` or `""` (which may be valid values for param `d`) to the function `foo`. In this case the result of `d || 5` will be also 5._ 
_To fix this we can explicitly check `d` for `undefined` like `d = typeof d === "undefined" ? 5 : d;`_

Q4: Explain the output of the following code and why

```js
    function foo(a) {
      return function(b) {
        return a + b;
      }
    }
    var bar = foo(1);
    console.log(bar(2))
```
_The output will be 3._
_It's a classical example of closure JS. Function `foo` return another function which will have an access to parameters of outer function. So returned function will still have access to `a` in their lexical scope._

Q5: Explain how the following function would be used

```js
    function double(a, done) {
      setTimeout(function() {
        done(a * 2);
      }, 100);
    }
```

_Here argument `done` supposed to be a callback (function). So we should use it like:_
```js
    double(5, function(result) {
        console.log(result); // 10
        // do something else with result
    });
```
