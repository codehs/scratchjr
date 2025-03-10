(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.aI.am === region.aS.am)
	{
		return 'on line ' + region.aI.am;
	}
	return 'on lines ' + region.aI.am + ' through ' + region.aS.am;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bA,
		impl.bQ,
		impl.bO,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.v) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.w),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.w);
		} else {
			var treeLen = builder.v * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.y) : builder.y;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.v);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.w) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.w);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{y: nodeList, v: (len / $elm$core$Array$branchFactor) | 0, w: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Transform$output = _Platform_outgoingPort('output', $elm$json$Json$Encode$string);
var $author$project$Path$ArcSegment = function (a) {
	return {$: 4, a: a};
};
var $author$project$Path$CloseSegment = function (a) {
	return {$: 5, a: a};
};
var $author$project$Path$CubicCurveSegment = function (a) {
	return {$: 2, a: a};
};
var $author$project$Path$LineSegment = function (a) {
	return {$: 1, a: a};
};
var $author$project$Path$MoveSegment = function (a) {
	return {$: 0, a: a};
};
var $author$project$Path$QuadraticCurveSegment = function (a) {
	return {$: 3, a: a};
};
var $author$project$Path$absolutePreviousControl = F3(
	function (previousSegment, command, defaultPoint) {
		var _v0 = _Utils_Tuple2(previousSegment, command.c);
		_v0$2:
		while (true) {
			switch (_v0.a.$) {
				case 2:
					if (_v0.b.$ === 5) {
						var params = _v0.a.a;
						var _v1 = _v0.b;
						return params.h;
					} else {
						break _v0$2;
					}
				case 3:
					if (_v0.b.$ === 7) {
						var params = _v0.a.a;
						var _v2 = _v0.b;
						return params.k;
					} else {
						break _v0$2;
					}
				default:
					break _v0$2;
			}
		}
		return defaultPoint;
	});
var $author$project$Point$add = F2(
	function (point1, point2) {
		return {e: point1.e + point2.e, f: point1.f + point2.f};
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Point$subtract = F2(
	function (point1, point2) {
		return {e: point1.e - point2.e, f: point1.f - point2.f};
	});
var $author$project$Point$reflectOver = F2(
	function (reflection, point) {
		return A2(
			$author$project$Point$add,
			reflection,
			A2($author$project$Point$subtract, reflection, point));
	});
var $author$project$Path$buildComponent = F2(
	function (command, componentBuilder) {
		var _v0 = componentBuilder;
		var components = _v0.x;
		var currentPoint = _v0.at;
		var firstConnectedPoint = _v0.au;
		var previousControl = function () {
			var _v8 = $elm$core$List$head(components);
			if (!_v8.$) {
				var segment = _v8.a.z;
				return A3($author$project$Path$absolutePreviousControl, segment, command, currentPoint);
			} else {
				return currentPoint;
			}
		}();
		var _v1 = command;
		var relation = _v1.i;
		var commandType = _v1.c;
		var absolute = function (ambiguousPoint) {
			if (!relation) {
				return ambiguousPoint;
			} else {
				return A2($author$project$Point$add, currentPoint, ambiguousPoint);
			}
		};
		var newSegment = function () {
			switch (commandType.$) {
				case 0:
					var to = commandType.a.a;
					return $author$project$Path$MoveSegment(
						{
							b: currentPoint,
							a: absolute(to)
						});
				case 1:
					var to = commandType.a.a;
					return $author$project$Path$LineSegment(
						{
							b: currentPoint,
							a: absolute(to)
						});
				case 2:
					var toX = commandType.a.ac;
					if (!relation) {
						return $author$project$Path$LineSegment(
							{
								b: currentPoint,
								a: {e: toX, f: currentPoint.f}
							});
					} else {
						return $author$project$Path$LineSegment(
							{
								b: currentPoint,
								a: {e: currentPoint.e + toX, f: currentPoint.f}
							});
					}
				case 3:
					var toY = commandType.a.ad;
					if (!relation) {
						return $author$project$Path$LineSegment(
							{
								b: currentPoint,
								a: {e: currentPoint.e, f: toY}
							});
					} else {
						return $author$project$Path$LineSegment(
							{
								b: currentPoint,
								a: {e: currentPoint.e, f: currentPoint.f + toY}
							});
					}
				case 4:
					var startControl = commandType.a.l;
					var endControl = commandType.a.h;
					var to = commandType.a.a;
					return $author$project$Path$CubicCurveSegment(
						{
							h: absolute(endControl),
							b: currentPoint,
							l: absolute(startControl),
							a: absolute(to)
						});
				case 5:
					var endControl = commandType.a.h;
					var to = commandType.a.a;
					return $author$project$Path$CubicCurveSegment(
						{
							h: absolute(endControl),
							b: currentPoint,
							l: A2($author$project$Point$reflectOver, currentPoint, previousControl),
							a: absolute(to)
						});
				case 6:
					var control = commandType.a.k;
					var to = commandType.a.a;
					return $author$project$Path$QuadraticCurveSegment(
						{
							k: absolute(control),
							b: currentPoint,
							a: absolute(to)
						});
				case 7:
					var to = commandType.a.a;
					return $author$project$Path$QuadraticCurveSegment(
						{
							k: A2($author$project$Point$reflectOver, currentPoint, previousControl),
							b: currentPoint,
							a: absolute(to)
						});
				case 8:
					var radii = commandType.a.r;
					var angle = commandType.a.q;
					var size = commandType.a.t;
					var rotation = commandType.a.s;
					var to = commandType.a.a;
					return $author$project$Path$ArcSegment(
						{
							q: angle,
							b: currentPoint,
							r: radii,
							s: rotation,
							t: size,
							a: absolute(to)
						});
				default:
					return $author$project$Path$CloseSegment(
						{b: currentPoint, a: firstConnectedPoint});
			}
		}();
		var newComponent = {u: command, z: newSegment};
		var nextCurrentPoint = function () {
			switch (newSegment.$) {
				case 0:
					var to = newSegment.a.a;
					return to;
				case 1:
					var to = newSegment.a.a;
					return to;
				case 2:
					var to = newSegment.a.a;
					return to;
				case 3:
					var to = newSegment.a.a;
					return to;
				case 4:
					var to = newSegment.a.a;
					return to;
				default:
					var to = newSegment.a.a;
					return to;
			}
		}();
		var nextFirstConnectedPoint = function () {
			if (!newSegment.$) {
				var to = newSegment.a.a;
				return to;
			} else {
				return firstConnectedPoint;
			}
		}();
		return {
			x: A2($elm$core$List$cons, newComponent, components),
			at: nextCurrentPoint,
			au: nextFirstConnectedPoint
		};
	});
var $author$project$Point$zero = {e: 0, f: 0};
var $author$project$Path$initComponentBuilder = {x: _List_Nil, at: $author$project$Point$zero, au: $author$project$Point$zero};
var $author$project$Path$buildComponents = function (commands) {
	return $elm$core$List$reverse(
		A3($elm$core$List$foldl, $author$project$Path$buildComponent, $author$project$Path$initComponentBuilder, commands).x);
};
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $author$project$Path$Parser$Invalid = function (a) {
	return {$: 1, a: a};
};
var $author$project$Path$Parser$addInvalidResult = F2(
	function (builder, invalidString) {
		var _v0 = builder.E;
		if (_v0.b && (_v0.a.$ === 1)) {
			var existing = _v0.a.a;
			var rest = _v0.b;
			return _Utils_update(
				builder,
				{
					E: A2(
						$elm$core$List$cons,
						$author$project$Path$Parser$Invalid(
							_Utils_ap(existing, invalidString)),
						rest)
				});
		} else {
			return (invalidString === '') ? builder : _Utils_update(
				builder,
				{
					E: A2(
						$elm$core$List$cons,
						$author$project$Path$Parser$Invalid(invalidString),
						builder.E)
				});
		}
	});
var $author$project$Path$Parser$ParsingParameterizedCommandType = function (a) {
	return {$: 1, a: a};
};
var $author$project$Path$Parser$Valid = function (a) {
	return {$: 0, a: a};
};
var $author$project$Path$Parser$addValidResult = F3(
	function (_v0, relation, commandType) {
		var results = _v0.E;
		var state = _v0.L;
		var newState = function () {
			if (state.$ === 1) {
				var stateParams = state.a;
				return $author$project$Path$Parser$ParsingParameterizedCommandType(
					_Utils_update(
						stateParams,
						{av: true}));
			} else {
				return state;
			}
		}();
		var command = {c: commandType, i: relation};
		return {
			E: A2(
				$elm$core$List$cons,
				$author$project$Path$Parser$Valid(command),
				results),
			L: newState
		};
	});
var $author$project$Path$NoLetter = {$: 2};
var $author$project$Path$Parser$FormattedArc = F5(
	function (radii, angle, size, rotation, to) {
		return {q: angle, r: radii, s: rotation, t: size, a: to};
	});
var $author$project$Path$Clockwise = 0;
var $author$project$Path$CounterClockwise = 1;
var $author$project$Path$Parser$FormattedArcRotation = F2(
	function (rotation, afterRotation) {
		return {ay: afterRotation, s: rotation};
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $author$project$Path$Comma = function (a) {
	return {$: 1, a: a};
};
var $author$project$Path$Spaces = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0;
	return function (s0) {
		var _v1 = parse(s0);
		if (_v1.$ === 1) {
			var x = _v1.b;
			return A2($elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _v1.b;
			var s1 = _v1.c;
			return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$Advanced$getOffset = function (s) {
	return A3($elm$parser$Parser$Advanced$Good, false, s.O, s);
};
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.d);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.O, offset) < 0,
					0,
					{aQ: col, m: s0.m, p: s0.p, O: offset, be: row, d: s0.d});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.O, s.be, s.aQ, s);
	};
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {aQ: col, bu: contextStack, a6: problem, be: row};
	});
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.be, s.aQ, x, s.m));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.O, s.be, s.aQ, s.d);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{aQ: newCol, m: s.m, p: s.p, O: newOffset, be: newRow, d: s.d});
	};
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $author$project$Path$Parser$separator = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			$elm$parser$Parser$backtrackable(
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(
								F4(
									function (before1, after1, before2, after2) {
										return $author$project$Path$Comma(
											{bM: after2 - before2, bN: after1 - before1});
									})),
							A2($elm$parser$Parser$ignorer, $elm$parser$Parser$getOffset, $elm$parser$Parser$spaces)),
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$getOffset,
							$elm$parser$Parser$token(','))),
					A2($elm$parser$Parser$ignorer, $elm$parser$Parser$getOffset, $elm$parser$Parser$spaces)),
				$elm$parser$Parser$getOffset)),
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (before, after) {
							return $author$project$Path$Spaces(after - before);
						})),
				A2($elm$parser$Parser$ignorer, $elm$parser$Parser$getOffset, $elm$parser$Parser$spaces)),
			$elm$parser$Parser$getOffset)
		]));
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$Path$Parser$formattedArcRotation = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedArcRotation),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$symbol('1')),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(1),
					$elm$parser$Parser$symbol('0'))
				]))),
	$author$project$Path$Parser$separator);
var $author$project$Path$Parser$FormattedArcSize = F2(
	function (size, afterSize) {
		return {az: afterSize, t: size};
	});
var $author$project$Path$Large = 0;
var $author$project$Path$Small = 1;
var $author$project$Path$Parser$formattedArcSize = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedArcSize),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$symbol('1')),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(1),
					$elm$parser$Parser$symbol('0'))
				]))),
	$author$project$Path$Parser$separator);
var $author$project$Path$Parser$FormattedFloat = F2(
	function (value, afterValue) {
		return {aL: afterValue, bl: value};
	});
var $elm$parser$Parser$ExpectingFloat = {$: 5};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {aQ: s.aQ + (newOffset - s.O), m: s.m, p: s.p, O: newOffset, be: s.be, d: s.d};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.O, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$String$slice = _String_slice;
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.d);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.be, s.aQ - (floatOffset + s.O), invalid, s.m));
		} else {
			if (_Utils_eq(s.O, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.O, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.O, floatOffset, s.d));
						if (_v1.$ === 1) {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.O, s.d)) {
			var zeroOffset = s.O + 1;
			var baseOffset = zeroOffset + 1;
			return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.d) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bB,
				c.aY,
				baseOffset,
				A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.d),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.d) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bB,
				c.a2,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.d),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.d) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bB,
				c.aO,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.d),
				s) : A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.bB,
				c.aU,
				c.a$,
				c.aV,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.bB,
				c.aU,
				c.a$,
				c.aV,
				A3($elm$parser$Parser$Advanced$consumeBase, 10, s.O, s.d),
				s);
		}
	};
};
var $elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				aO: $elm$core$Result$Err(invalid),
				aU: expecting,
				aV: $elm$core$Result$Ok($elm$core$Basics$identity),
				aY: $elm$core$Result$Err(invalid),
				a$: $elm$core$Result$Ok($elm$core$Basics$toFloat),
				bB: invalid,
				a2: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$float = A2($elm$parser$Parser$Advanced$float, $elm$parser$Parser$ExpectingFloat, $elm$parser$Parser$ExpectingFloat);
var $author$project$Path$Parser$float = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$negate),
				$elm$parser$Parser$symbol('-')),
			$elm$parser$Parser$float),
			$elm$parser$Parser$float
		]));
var $author$project$Path$Parser$formattedFloat = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedFloat),
		$author$project$Path$Parser$float),
	$author$project$Path$Parser$separator);
var $author$project$Path$Parser$FormattedPoint = F4(
	function (x, afterX, y, afterY) {
		return {aM: afterX, aN: afterY, e: x, f: y};
	});
var $author$project$Path$Parser$formattedPoint = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedPoint),
				$author$project$Path$Parser$float),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$float),
	$author$project$Path$Parser$separator);
var $author$project$Path$Parser$formattedArc = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedArc),
					$author$project$Path$Parser$formattedPoint),
				$author$project$Path$Parser$formattedFloat),
			$author$project$Path$Parser$formattedArcSize),
		$author$project$Path$Parser$formattedArcRotation),
	$author$project$Path$Parser$formattedPoint);
var $author$project$Path$ArcCommand = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $author$project$Path$Parser$getArcRotation = function (_v0) {
	var rotation = _v0.s;
	return rotation;
};
var $author$project$Path$Parser$getArcRotationSeparator = function (_v0) {
	var afterRotation = _v0.ay;
	return afterRotation;
};
var $author$project$Path$Parser$getArcSize = function (_v0) {
	var size = _v0.t;
	return size;
};
var $author$project$Path$Parser$getArcSizeSeparator = function (_v0) {
	var afterSize = _v0.az;
	return afterSize;
};
var $author$project$Path$Parser$getFloat = function (_v0) {
	var value = _v0.bl;
	return value;
};
var $author$project$Path$Parser$getFloatSeparator = function (_v0) {
	var afterValue = _v0.aL;
	return afterValue;
};
var $author$project$Path$Parser$getPoint = function (_v0) {
	var x = _v0.e;
	var y = _v0.f;
	return {e: x, f: y};
};
var $author$project$Path$Parser$getPointSeparator = function (_v0) {
	var afterX = _v0.aM;
	var afterY = _v0.aN;
	return {e: afterX, f: afterY};
};
var $author$project$Path$Parser$makeArc = F2(
	function (sep, _v0) {
		var radii = _v0.r;
		var angle = _v0.q;
		var size = _v0.t;
		var rotation = _v0.s;
		var to = _v0.a;
		return A2(
			$author$project$Path$ArcCommand,
			{
				q: $author$project$Path$Parser$getFloat(angle),
				r: $author$project$Path$Parser$getPoint(radii),
				s: $author$project$Path$Parser$getArcRotation(rotation),
				t: $author$project$Path$Parser$getArcSize(size),
				a: $author$project$Path$Parser$getPoint(to)
			},
			{
				aw: $author$project$Path$Parser$getFloatSeparator(angle),
				g: sep,
				ax: $author$project$Path$Parser$getPointSeparator(radii),
				ay: $author$project$Path$Parser$getArcRotationSeparator(rotation),
				az: $author$project$Path$Parser$getArcSizeSeparator(size),
				o: $author$project$Path$Parser$getPointSeparator(to)
			});
	});
var $author$project$Path$Parser$arcCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeArc($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedArc) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeArc),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedArc);
};
var $author$project$Path$Parser$Chomping = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.O, s.d);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{aQ: 1, m: s.m, p: s.p, O: s.O + 1, be: s.be + 1, d: s.d}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{aQ: s.aQ + 1, m: s.m, p: s.p, O: newOffset, be: s.be, d: s.d}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.O, s1.O, s0.d),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $author$project$Path$Parser$chompOne = F2(
	function (chompedString, builder) {
		return A2(
			$elm$parser$Parser$map,
			function (chompedChar) {
				return _Utils_update(
					builder,
					{
						L: $author$project$Path$Parser$Chomping(
							_Utils_ap(chompedString, chompedChar))
					});
			},
			$elm$parser$Parser$getChompedString(
				$elm$parser$Parser$chompIf(
					function (_v0) {
						return true;
					})));
	});
var $author$project$Path$Absolute = 0;
var $author$project$Path$CloseCommand = function (a) {
	return {$: 9, a: a};
};
var $author$project$Path$CloseFormat = function (afterLetter) {
	return {g: afterLetter};
};
var $author$project$Path$Parser$ParsedClose = {$: 2};
var $author$project$Path$Relative = 1;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Path$Parser$closeCommand = function (builder) {
	var relationFormat = A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Tuple$pair),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(0),
						$elm$parser$Parser$token('Z')),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(1),
						$elm$parser$Parser$token('z'))
					]))),
		A2($elm$parser$Parser$map, $author$project$Path$CloseFormat, $author$project$Path$Parser$separator));
	var result = A2(
		$elm$parser$Parser$map,
		function (_v0) {
			var relation = _v0.a;
			var format = _v0.b;
			return $author$project$Path$Parser$Valid(
				{
					c: $author$project$Path$CloseCommand(format),
					i: relation
				});
		},
		relationFormat);
	return A2(
		$elm$parser$Parser$map,
		function (newResult) {
			return {
				E: A2($elm$core$List$cons, newResult, builder.E),
				L: $author$project$Path$Parser$ParsedClose
			};
		},
		result);
};
var $author$project$Path$Parser$FormattedCubicCurve = F3(
	function (startControl, endControl, to) {
		return {h: endControl, l: startControl, a: to};
	});
var $author$project$Path$Parser$formattedCubicCurve = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedCubicCurve),
			$author$project$Path$Parser$formattedPoint),
		$author$project$Path$Parser$formattedPoint),
	$author$project$Path$Parser$formattedPoint);
var $author$project$Path$CubicCurveCommand = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$Path$Parser$makeCubicCurve = F2(
	function (sep, _v0) {
		var startControl = _v0.l;
		var endControl = _v0.h;
		var to = _v0.a;
		return A2(
			$author$project$Path$CubicCurveCommand,
			{
				h: $author$project$Path$Parser$getPoint(endControl),
				l: $author$project$Path$Parser$getPoint(startControl),
				a: $author$project$Path$Parser$getPoint(to)
			},
			{
				Q: $author$project$Path$Parser$getPointSeparator(endControl),
				g: sep,
				ak: $author$project$Path$Parser$getPointSeparator(startControl),
				o: $author$project$Path$Parser$getPointSeparator(to)
			});
	});
var $author$project$Path$Parser$cubicCurveCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeCubicCurve($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedCubicCurve) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeCubicCurve),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedCubicCurve);
};
var $author$project$Path$HorizontalLineCommand = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$Path$Parser$makeHorizontalLine = F2(
	function (sep, formattedToX) {
		return A2(
			$author$project$Path$HorizontalLineCommand,
			{
				ac: $author$project$Path$Parser$getFloat(formattedToX)
			},
			{
				g: sep,
				ar: $author$project$Path$Parser$getFloatSeparator(formattedToX)
			});
	});
var $author$project$Path$Parser$horizontalLineCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeHorizontalLine($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedFloat) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeHorizontalLine),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedFloat);
};
var $author$project$Path$LineCommand = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Path$Parser$makeLine = F2(
	function (sep, formattedTo) {
		return A2(
			$author$project$Path$LineCommand,
			{
				a: $author$project$Path$Parser$getPoint(formattedTo)
			},
			{
				g: sep,
				o: $author$project$Path$Parser$getPointSeparator(formattedTo)
			});
	});
var $author$project$Path$Parser$lineCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeLine($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedPoint) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeLine),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedPoint);
};
var $author$project$Path$MoveCommand = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Path$Parser$makeMove = F2(
	function (sep, formattedTo) {
		return A2(
			$author$project$Path$MoveCommand,
			{
				a: $author$project$Path$Parser$getPoint(formattedTo)
			},
			{
				g: sep,
				o: $author$project$Path$Parser$getPointSeparator(formattedTo)
			});
	});
var $author$project$Path$Parser$moveCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeLine($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedPoint) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeMove),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedPoint);
};
var $author$project$Path$Parser$Arc = 8;
var $author$project$Path$Parser$CubicCurve = 4;
var $author$project$Path$Parser$HorizontalLine = 2;
var $author$project$Path$Parser$Line = 1;
var $author$project$Path$Parser$Move = 0;
var $author$project$Path$Parser$QuadraticCurve = 6;
var $author$project$Path$Parser$SmoothCubicCurve = 5;
var $author$project$Path$Parser$SmoothQuadraticCurve = 7;
var $author$project$Path$Parser$VerticalLine = 3;
var $author$project$Path$Parser$commandLetterToStateBuilder = function () {
	var paramStateBuilder = F2(
		function (commandType, relation) {
			return $author$project$Path$Parser$ParsingParameterizedCommandType(
				{c: commandType, av: false, i: relation});
		});
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'M',
			paramStateBuilder(0)),
			_Utils_Tuple2(
			'L',
			paramStateBuilder(1)),
			_Utils_Tuple2(
			'H',
			paramStateBuilder(2)),
			_Utils_Tuple2(
			'V',
			paramStateBuilder(3)),
			_Utils_Tuple2(
			'C',
			paramStateBuilder(4)),
			_Utils_Tuple2(
			'S',
			paramStateBuilder(5)),
			_Utils_Tuple2(
			'Q',
			paramStateBuilder(6)),
			_Utils_Tuple2(
			'T',
			paramStateBuilder(7)),
			_Utils_Tuple2(
			'A',
			paramStateBuilder(8))
		]);
}();
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$String$toLower = _String_toLower;
var $author$project$Path$Parser$parameterizedCommandLetters = function (builder) {
	var letterParser = function (_v0) {
		var letter = _v0.a;
		var stateBuilder = _v0.b;
		return A2(
			$elm$parser$Parser$map,
			function (state) {
				return _Utils_update(
					builder,
					{L: state});
			},
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(
							stateBuilder(0)),
						$elm$parser$Parser$token(letter)),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(
							stateBuilder(1)),
						$elm$parser$Parser$token(
							$elm$core$String$toLower(letter)))
					])));
	};
	return $elm$parser$Parser$oneOf(
		A2($elm$core$List$map, letterParser, $author$project$Path$Parser$commandLetterToStateBuilder));
};
var $author$project$Path$Parser$FormattedQuadraticCurve = F2(
	function (control, to) {
		return {k: control, a: to};
	});
var $author$project$Path$Parser$formattedQuadraticCurve = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedQuadraticCurve),
		$author$project$Path$Parser$formattedPoint),
	$author$project$Path$Parser$formattedPoint);
var $author$project$Path$QuadraticCurveCommand = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $author$project$Path$Parser$makeQuadraticCurve = F2(
	function (sep, _v0) {
		var control = _v0.k;
		var to = _v0.a;
		return A2(
			$author$project$Path$QuadraticCurveCommand,
			{
				k: $author$project$Path$Parser$getPoint(control),
				a: $author$project$Path$Parser$getPoint(to)
			},
			{
				aj: $author$project$Path$Parser$getPointSeparator(control),
				g: sep,
				o: $author$project$Path$Parser$getPointSeparator(to)
			});
	});
var $author$project$Path$Parser$quadraticCurveCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeQuadraticCurve($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedQuadraticCurve) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeQuadraticCurve),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedQuadraticCurve);
};
var $author$project$Path$Parser$FormattedSmoothCubicCurve = F2(
	function (endControl, to) {
		return {h: endControl, a: to};
	});
var $author$project$Path$Parser$formattedSmoothCubicCurve = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($author$project$Path$Parser$FormattedSmoothCubicCurve),
		$author$project$Path$Parser$formattedPoint),
	$author$project$Path$Parser$formattedPoint);
var $author$project$Path$SmoothCubicCurveCommand = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $author$project$Path$Parser$makeSmoothCubicCurve = F2(
	function (sep, _v0) {
		var endControl = _v0.h;
		var to = _v0.a;
		return A2(
			$author$project$Path$SmoothCubicCurveCommand,
			{
				h: $author$project$Path$Parser$getPoint(endControl),
				a: $author$project$Path$Parser$getPoint(to)
			},
			{
				Q: $author$project$Path$Parser$getPointSeparator(endControl),
				g: sep,
				o: $author$project$Path$Parser$getPointSeparator(to)
			});
	});
var $author$project$Path$Parser$smoothCubicCurveCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeSmoothCubicCurve($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedSmoothCubicCurve) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeSmoothCubicCurve),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedSmoothCubicCurve);
};
var $author$project$Path$SmoothQuadraticCurveCommand = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $author$project$Path$Parser$makeSmoothQuadraticCurve = F2(
	function (sep, formattedTo) {
		return A2(
			$author$project$Path$SmoothQuadraticCurveCommand,
			{
				a: $author$project$Path$Parser$getPoint(formattedTo)
			},
			{
				g: sep,
				o: $author$project$Path$Parser$getPointSeparator(formattedTo)
			});
	});
var $author$project$Path$Parser$smoothQuadraticCurveCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeSmoothQuadraticCurve($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedPoint) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeSmoothQuadraticCurve),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedPoint);
};
var $author$project$Path$VerticalLineCommand = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $author$project$Path$Parser$makeVerticalLine = F2(
	function (sep, formattedToY) {
		return A2(
			$author$project$Path$VerticalLineCommand,
			{
				ad: $author$project$Path$Parser$getFloat(formattedToY)
			},
			{
				g: sep,
				as: $author$project$Path$Parser$getFloatSeparator(formattedToY)
			});
	});
var $author$project$Path$Parser$verticalLineCommand = function (parsedOne) {
	return parsedOne ? A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			$author$project$Path$Parser$makeVerticalLine($author$project$Path$NoLetter)),
		$author$project$Path$Parser$formattedFloat) : A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Path$Parser$makeVerticalLine),
			$author$project$Path$Parser$separator),
		$author$project$Path$Parser$formattedFloat);
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $author$project$Path$Parser$withAllBranches = F4(
	function (builder, parsedOne, letter, commandTypeParser) {
		return $elm$parser$Parser$oneOf(
			$elm$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[commandTypeParser]),
						parsedOne ? _List_fromArray(
						[
							$author$project$Path$Parser$parameterizedCommandLetters(builder),
							$author$project$Path$Parser$closeCommand(builder)
						]) : _List_Nil,
						_List_fromArray(
						[
							A2($author$project$Path$Parser$chompOne, letter, builder)
						])
					])));
	});
var $author$project$Path$Parser$builderStep = function (builder) {
	var _v0 = builder.L;
	switch (_v0.$) {
		case 0:
			var chompedString = _v0.a;
			var builderWithResult = A2($author$project$Path$Parser$addInvalidResult, builder, chompedString);
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$author$project$Path$Parser$parameterizedCommandLetters(builderWithResult),
						$author$project$Path$Parser$closeCommand(builderWithResult),
						A2($author$project$Path$Parser$chompOne, chompedString, builder)
					]));
		case 1:
			var commandType = _v0.a.c;
			var relation = _v0.a.i;
			var parsedOne = _v0.a.av;
			var letter = function (uppercase) {
				if (parsedOne) {
					return '';
				} else {
					if (!relation) {
						return uppercase;
					} else {
						return $elm$core$String$toLower(uppercase);
					}
				}
			};
			var makeParser = F2(
				function (commandTypeParser, uppercase) {
					return A4(
						$author$project$Path$Parser$withAllBranches,
						builder,
						parsedOne,
						letter(uppercase),
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(
								A2($author$project$Path$Parser$addValidResult, builder, relation)),
							$elm$parser$Parser$backtrackable(commandTypeParser)));
				});
			switch (commandType) {
				case 0:
					return A2(
						makeParser,
						$author$project$Path$Parser$moveCommand(parsedOne),
						'M');
				case 1:
					return A2(
						makeParser,
						$author$project$Path$Parser$lineCommand(parsedOne),
						'L');
				case 2:
					return A2(
						makeParser,
						$author$project$Path$Parser$horizontalLineCommand(parsedOne),
						'H');
				case 3:
					return A2(
						makeParser,
						$author$project$Path$Parser$verticalLineCommand(parsedOne),
						'V');
				case 4:
					return A2(
						makeParser,
						$author$project$Path$Parser$cubicCurveCommand(parsedOne),
						'C');
				case 5:
					return A2(
						makeParser,
						$author$project$Path$Parser$smoothCubicCurveCommand(parsedOne),
						'S');
				case 6:
					return A2(
						makeParser,
						$author$project$Path$Parser$quadraticCurveCommand(parsedOne),
						'Q');
				case 7:
					return A2(
						makeParser,
						$author$project$Path$Parser$smoothQuadraticCurveCommand(parsedOne),
						'T');
				default:
					return A2(
						makeParser,
						$author$project$Path$Parser$arcCommand(parsedOne),
						'A');
			}
		default:
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$author$project$Path$Parser$parameterizedCommandLetters(builder),
						$author$project$Path$Parser$closeCommand(builder),
						A2($author$project$Path$Parser$chompOne, '', builder)
					]));
	}
};
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$core$String$length = _String_length;
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.d),
			s.O) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $author$project$Path$Parser$initBuilder = {
	E: _List_Nil,
	L: $author$project$Path$Parser$Chomping('')
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $author$project$Path$Parser$builderLoop = A2(
	$elm$parser$Parser$loop,
	$author$project$Path$Parser$initBuilder,
	function (builder) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(builder);
					},
					$elm$parser$Parser$end),
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed($elm$parser$Parser$Loop),
					$author$project$Path$Parser$builderStep(builder))
				]));
	});
var $author$project$Path$Parser$finishBuilder = function (_v0) {
	var results = _v0.E;
	var state = _v0.L;
	switch (state.$) {
		case 0:
			var chompedString = state.a;
			return A2(
				$author$project$Path$Parser$addInvalidResult,
				{E: results, L: state},
				chompedString).E;
		case 1:
			var commandType = state.a.c;
			var relation = state.a.i;
			var parsedOne = state.a.av;
			var letterCase = function () {
				if (!relation) {
					return $elm$core$Basics$identity;
				} else {
					return $elm$core$String$toLower;
				}
			}();
			var letter = function () {
				switch (commandType) {
					case 0:
						return letterCase('M');
					case 1:
						return letterCase('L');
					case 2:
						return letterCase('H');
					case 3:
						return letterCase('V');
					case 4:
						return letterCase('C');
					case 5:
						return letterCase('S');
					case 6:
						return letterCase('Q');
					case 7:
						return letterCase('T');
					default:
						return letterCase('A');
				}
			}();
			return parsedOne ? results : A2(
				$author$project$Path$Parser$addInvalidResult,
				{E: results, L: state},
				letter).E;
		default:
			return results;
	}
};
var $author$project$Path$fromComponents = function (components) {
	return {x: components, aB: $elm$core$Maybe$Nothing, A: _List_Nil};
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {aQ: col, a6: problem, be: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.be, p.aQ, p.a6);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{aQ: 1, m: _List_Nil, p: 1, O: 0, be: 1, d: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Path$defaultSeparator = $author$project$Path$Spaces(1);
var $author$project$Path$defaultPointSeparator = {e: $author$project$Path$defaultSeparator, f: $author$project$Path$defaultSeparator};
var $author$project$Path$preFormattedArc = function (params) {
	return {
		c: A2(
			$author$project$Path$ArcCommand,
			params,
			{aw: $author$project$Path$defaultSeparator, g: $author$project$Path$defaultSeparator, ax: $author$project$Path$defaultPointSeparator, ay: $author$project$Path$defaultSeparator, az: $author$project$Path$defaultSeparator, o: $author$project$Path$defaultPointSeparator}),
		i: 0
	};
};
var $author$project$Path$preFormattedClose = {
	c: $author$project$Path$CloseCommand(
		{g: $author$project$Path$defaultSeparator}),
	i: 0
};
var $author$project$Path$preFormattedCubicCurve = function (params) {
	return {
		c: A2(
			$author$project$Path$CubicCurveCommand,
			params,
			{Q: $author$project$Path$defaultPointSeparator, g: $author$project$Path$defaultSeparator, ak: $author$project$Path$defaultPointSeparator, o: $author$project$Path$defaultPointSeparator}),
		i: 0
	};
};
var $author$project$Path$preFormattedLine = function (params) {
	return {
		c: A2(
			$author$project$Path$LineCommand,
			params,
			{g: $author$project$Path$defaultSeparator, o: $author$project$Path$defaultPointSeparator}),
		i: 0
	};
};
var $author$project$Path$preFormattedMove = function (params) {
	return {
		c: A2(
			$author$project$Path$MoveCommand,
			params,
			{g: $author$project$Path$defaultSeparator, o: $author$project$Path$defaultPointSeparator}),
		i: 0
	};
};
var $author$project$Path$preFormattedQuadraticCurve = function (params) {
	return {
		c: A2(
			$author$project$Path$QuadraticCurveCommand,
			params,
			{aj: $author$project$Path$defaultPointSeparator, g: $author$project$Path$defaultSeparator, o: $author$project$Path$defaultPointSeparator}),
		i: 0
	};
};
var $author$project$Path$segmentToAbsoluteExplicitCommand = function (segment) {
	switch (segment.$) {
		case 0:
			var to = segment.a.a;
			return $author$project$Path$preFormattedMove(
				{a: to});
		case 1:
			var to = segment.a.a;
			return $author$project$Path$preFormattedLine(
				{a: to});
		case 2:
			var startControl = segment.a.l;
			var endControl = segment.a.h;
			var to = segment.a.a;
			return $author$project$Path$preFormattedCubicCurve(
				{h: endControl, l: startControl, a: to});
		case 3:
			var control = segment.a.k;
			var to = segment.a.a;
			return $author$project$Path$preFormattedQuadraticCurve(
				{k: control, a: to});
		case 4:
			var radii = segment.a.r;
			var angle = segment.a.q;
			var size = segment.a.t;
			var rotation = segment.a.s;
			var to = segment.a.a;
			return $author$project$Path$preFormattedArc(
				{q: angle, r: radii, s: rotation, t: size, a: to});
		default:
			return $author$project$Path$preFormattedClose;
	}
};
var $author$project$Path$Parser$trimResultToCommand = F2(
	function (result, _v0) {
		var foundInvalid = _v0.a;
		var commands = _v0.b;
		if (foundInvalid) {
			return _Utils_Tuple2(foundInvalid, commands);
		} else {
			if (!result.$) {
				var command = result.a;
				return _Utils_Tuple2(
					false,
					A2($elm$core$List$cons, command, commands));
			} else {
				return _Utils_Tuple2(true, commands);
			}
		}
	});
var $author$project$Path$Parser$parseAndTrim = function (commandString) {
	var _v0 = A2($elm$parser$Parser$run, $author$project$Path$Parser$builderLoop, commandString);
	if (!_v0.$) {
		var builder = _v0.a;
		return $author$project$Path$fromComponents(
			$author$project$Path$buildComponents(
				A2(
					$elm$core$List$map,
					$author$project$Path$segmentToAbsoluteExplicitCommand,
					A2(
						$elm$core$List$map,
						function ($) {
							return $.z;
						},
						$author$project$Path$buildComponents(
							$elm$core$List$reverse(
								A3(
									$elm$core$List$foldl,
									$author$project$Path$Parser$trimResultToCommand,
									_Utils_Tuple2(false, _List_Nil),
									$elm$core$List$reverse(
										$author$project$Path$Parser$finishBuilder(builder))).b))))));
	} else {
		return $author$project$Path$fromComponents(_List_Nil);
	}
};
var $author$project$Point$scaleXY = F3(
	function (xFactor, yFactor, _v0) {
		var x = _v0.e;
		var y = _v0.f;
		return {e: xFactor * x, f: yFactor * y};
	});
var $author$project$Path$scaleSegment = F3(
	function (xFactor, yFactor, segment) {
		var scalePoint = function (point) {
			return A3($author$project$Point$scaleXY, xFactor, yFactor, point);
		};
		switch (segment.$) {
			case 0:
				var from = segment.a.b;
				var to = segment.a.a;
				return $author$project$Path$MoveSegment(
					{
						b: scalePoint(from),
						a: scalePoint(to)
					});
			case 1:
				var from = segment.a.b;
				var to = segment.a.a;
				return $author$project$Path$LineSegment(
					{
						b: scalePoint(from),
						a: scalePoint(to)
					});
			case 2:
				var startControl = segment.a.l;
				var endControl = segment.a.h;
				var from = segment.a.b;
				var to = segment.a.a;
				return $author$project$Path$CubicCurveSegment(
					{
						h: scalePoint(endControl),
						b: scalePoint(from),
						l: scalePoint(startControl),
						a: scalePoint(to)
					});
			case 3:
				var control = segment.a.k;
				var from = segment.a.b;
				var to = segment.a.a;
				return $author$project$Path$QuadraticCurveSegment(
					{
						k: scalePoint(control),
						b: scalePoint(from),
						a: scalePoint(to)
					});
			case 4:
				var radii = segment.a.r;
				var angle = segment.a.q;
				var size = segment.a.t;
				var rotation = segment.a.s;
				var from = segment.a.b;
				var to = segment.a.a;
				return $author$project$Path$ArcSegment(
					{
						q: angle,
						b: scalePoint(from),
						r: scalePoint(radii),
						s: rotation,
						t: size,
						a: scalePoint(to)
					});
			default:
				var from = segment.a.b;
				var to = segment.a.a;
				return $author$project$Path$CloseSegment(
					{
						b: scalePoint(from),
						a: scalePoint(to)
					});
		}
	});
var $author$project$Path$scale = F3(
	function (xFactor, yFactor, path) {
		return $author$project$Path$fromComponents(
			$author$project$Path$buildComponents(
				A2(
					$elm$core$List$map,
					$author$project$Path$segmentToAbsoluteExplicitCommand,
					A2(
						$elm$core$List$map,
						A2($author$project$Path$scaleSegment, xFactor, yFactor),
						A2(
							$elm$core$List$map,
							function ($) {
								return $.z;
							},
							path.x)))));
	});
var $author$project$Path$arcRotationToString = function (rotation) {
	if (!rotation) {
		return '1';
	} else {
		return '0';
	}
};
var $author$project$Path$arcSizeToString = function (size) {
	if (!size) {
		return '1';
	} else {
		return '0';
	}
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $author$project$Path$separatorToString = function (separator) {
	switch (separator.$) {
		case 0:
			var count = separator.a;
			return A2($elm$core$String$repeat, count, ' ');
		case 1:
			var spacesBefore = separator.a.bN;
			var spacesAfter = separator.a.bM;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						A2($elm$core$String$repeat, spacesBefore, ' '),
						',',
						A2($elm$core$String$repeat, spacesAfter, ' ')
					]));
		default:
			return '';
	}
};
var $author$project$Path$pointToString = F2(
	function (point, separator) {
		return $elm$core$String$concat(
			_List_fromArray(
				[
					$elm$core$String$fromFloat(point.e),
					$author$project$Path$separatorToString(separator.e),
					$elm$core$String$fromFloat(point.f),
					$author$project$Path$separatorToString(separator.f)
				]));
	});
var $author$project$Path$commandToString = function (_v0) {
	var relation = _v0.i;
	var commandType = _v0.c;
	var letter = F2(
		function (separator, upper) {
			if (separator.$ === 2) {
				return '';
			} else {
				if (!relation) {
					return _Utils_ap(
						upper,
						$author$project$Path$separatorToString(separator));
				} else {
					return _Utils_ap(
						$elm$core$String$toLower(upper),
						$author$project$Path$separatorToString(separator));
				}
			}
		});
	switch (commandType.$) {
		case 0:
			var to = commandType.a.a;
			var afterLetter = commandType.b.g;
			var afterTo = commandType.b.o;
			return _Utils_ap(
				A2(letter, afterLetter, 'M'),
				A2($author$project$Path$pointToString, to, afterTo));
		case 1:
			var to = commandType.a.a;
			var afterLetter = commandType.b.g;
			var afterTo = commandType.b.o;
			return _Utils_ap(
				A2(letter, afterLetter, 'L'),
				A2($author$project$Path$pointToString, to, afterTo));
		case 2:
			var toX = commandType.a.ac;
			var afterLetter = commandType.b.g;
			var afterToX = commandType.b.ar;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						A2(letter, afterLetter, 'H'),
						$elm$core$String$fromFloat(toX),
						$author$project$Path$separatorToString(afterToX)
					]));
		case 3:
			var toY = commandType.a.ad;
			var afterLetter = commandType.b.g;
			var afterToY = commandType.b.as;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						A2(letter, afterLetter, 'V'),
						$elm$core$String$fromFloat(toY),
						$author$project$Path$separatorToString(afterToY)
					]));
		case 4:
			var parameters = commandType.a;
			var format = commandType.b;
			var _v2 = parameters;
			var startControl = _v2.l;
			var endControl = _v2.h;
			var to = _v2.a;
			var _v3 = format;
			var afterLetter = _v3.g;
			var afterStartControl = _v3.ak;
			var afterEndControl = _v3.Q;
			var afterTo = _v3.o;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						A2(letter, afterLetter, 'C'),
						A2($author$project$Path$pointToString, startControl, afterStartControl),
						A2($author$project$Path$pointToString, endControl, afterEndControl),
						A2($author$project$Path$pointToString, to, afterTo)
					]));
		case 5:
			var parameters = commandType.a;
			var format = commandType.b;
			var _v4 = parameters;
			var endControl = _v4.h;
			var to = _v4.a;
			var _v5 = format;
			var afterLetter = _v5.g;
			var afterEndControl = _v5.Q;
			var afterTo = _v5.o;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						A2(letter, afterLetter, 'S'),
						A2($author$project$Path$pointToString, endControl, afterEndControl),
						A2($author$project$Path$pointToString, to, afterTo)
					]));
		case 6:
			var parameters = commandType.a;
			var format = commandType.b;
			var _v6 = parameters;
			var control = _v6.k;
			var to = _v6.a;
			var _v7 = format;
			var afterLetter = _v7.g;
			var afterControl = _v7.aj;
			var afterTo = _v7.o;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						A2(letter, afterLetter, 'Q'),
						A2($author$project$Path$pointToString, control, afterControl),
						A2($author$project$Path$pointToString, to, afterTo)
					]));
		case 7:
			var to = commandType.a.a;
			var afterLetter = commandType.b.g;
			var afterTo = commandType.b.o;
			return _Utils_ap(
				A2(letter, afterLetter, 'T'),
				A2($author$project$Path$pointToString, to, afterTo));
		case 8:
			var parameters = commandType.a;
			var format = commandType.b;
			var _v8 = parameters;
			var radii = _v8.r;
			var angle = _v8.q;
			var size = _v8.t;
			var rotation = _v8.s;
			var to = _v8.a;
			var _v9 = format;
			var afterRadii = _v9.ax;
			var afterAngle = _v9.aw;
			var afterSize = _v9.az;
			var afterRotation = _v9.ay;
			var afterTo = _v9.o;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						A2(letter, format.g, 'A'),
						A2($author$project$Path$pointToString, radii, afterRadii),
						$elm$core$String$fromFloat(angle),
						$author$project$Path$separatorToString(afterAngle),
						$author$project$Path$arcSizeToString(size),
						$author$project$Path$separatorToString(afterSize),
						$author$project$Path$arcRotationToString(rotation),
						$author$project$Path$separatorToString(afterRotation),
						A2($author$project$Path$pointToString, to, afterTo)
					]));
		default:
			var afterLetter = commandType.a.g;
			return A2(letter, afterLetter, 'Z');
	}
};
var $author$project$Path$toString = function (_v0) {
	var components = _v0.x;
	var step = F2(
		function (_v1, commandString) {
			var command = _v1.u;
			return _Utils_ap(
				commandString,
				$author$project$Path$commandToString(command));
		});
	return A3($elm$core$List$foldl, step, '', components);
};
var $author$project$Transform$transformCommandString = function (_v0) {
	var commandString = _v0.aA;
	var scaleX = _v0.aF;
	var scaleY = _v0.aG;
	return $author$project$Path$toString(
		A3(
			$author$project$Path$scale,
			scaleX,
			scaleY,
			$author$project$Path$Parser$parseAndTrim(commandString)));
};
var $author$project$Transform$init = function (config) {
	return _Utils_Tuple2(
		0,
		$author$project$Transform$output(
			$author$project$Transform$transformCommandString(config)));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Transform$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Transform$update = F2(
	function (_v0, _v1) {
		return _Utils_Tuple2(0, $elm$core$Platform$Cmd$none);
	});
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Transform$main = $elm$core$Platform$worker(
	{bA: $author$project$Transform$init, bO: $author$project$Transform$subscriptions, bQ: $author$project$Transform$update});
_Platform_export({'Transform':{'init':$author$project$Transform$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (scaleY) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (scaleX) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (commandString) {
							return $elm$json$Json$Decode$succeed(
								{aA: commandString, aF: scaleX, aG: scaleY});
						},
						A2($elm$json$Json$Decode$field, 'commandString', $elm$json$Json$Decode$string));
				},
				A2($elm$json$Json$Decode$field, 'scaleX', $elm$json$Json$Decode$float));
		},
		A2($elm$json$Json$Decode$field, 'scaleY', $elm$json$Json$Decode$float)))(0)}});}(this));