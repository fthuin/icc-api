import base64js from 'base64-js';

export const utils: Object = {
    /**
* String to Uint8Array
*
* @param s
* @returns {Uint8Array}
*/
    text2ua: function (s) {
        var ua = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) {
            ua[i] = s.charCodeAt(i) & 0xff;
        }
        return ua;
    },

    /**
* Hex String to Uint8Array
*
* @param s
* @returns {Uint8Array}
*/
    hex2ua: function (s) {
        var ua = new Uint8Array(s.length / 2);
        s = s.toLowerCase();
        for (var i = 0; i < s.length; i += 2) {
            ua[i / 2] = (s.charCodeAt(i) < 58 ? s.charCodeAt(i) - 48 : s.charCodeAt(i) - 87) * 16 + (s.charCodeAt(i + 1) < 58 ? s.charCodeAt(i + 1) - 48 : s.charCodeAt(i + 1) - 87);
        }
        return ua;
    },

    spkiToJwk: function (buf) {
        var hex = this.ua2hex(buf);
        if (!hex.startsWith('3082') || !hex.substr(8).startsWith('0282010100')) {
            hex = hex.substr(48);
            buf = this.hex2ua(hex);
        }
        var key: any = {};
        var offset = buf[1] & 0x80 ? buf[1] - 0x80 + 2 : 2;

        function read() {
            var s = buf[offset + 1];

            if (s & 0x80) {
                var n = s - 0x80;
                s = n === 2 ? 256 * buf[offset + 2] + buf[offset + 3] : buf[offset + 2];
                offset += n;
            }

            offset += 2;

            var b = buf.slice(offset, offset + s);
            offset += s;
            return b;
        }

        key.modulus = read();
        key.publicExponent = read();

        return {
            kty: 'RSA',
            n: this.base64url(this.minimalRep(key.modulus)),
            e: this.base64url(this.minimalRep(key.publicExponent))
        };
    },

    pkcs8ToJwk: function (buf) {
        var hex = this.ua2hex(buf);
        if (!hex.startsWith('3082') || !hex.substr(8).startsWith('0201000282010100')) {
            hex = hex.substr(52);
            buf = this.hex2ua(hex);
        }
        var key: any = {};
        var offset = buf[1] & 0x80 ? buf[1] - 0x80 + 5 : 7;

        function read() {
            var s = buf[offset + 1];

            if (s & 0x80) {
                var n = s - 0x80;
                s = n === 2 ? 256 * buf[offset + 2] + buf[offset + 3] : buf[offset + 2];
                offset += n;
            }

            offset += 2;

            var b = buf.slice(offset, offset + s);
            offset += s;
            return b;
        }

        key.modulus = read();
        key.publicExponent = read();
        key.privateExponent = read();
        key.prime1 = read();
        key.prime2 = read();
        key.exponent1 = read();
        key.exponent2 = read();
        key.coefficient = read();

        return {
            kty: 'RSA',
            n: this.base64url(this.minimalRep(key.modulus)),
            e: this.base64url(this.minimalRep(key.publicExponent)),
            d: this.base64url(this.minimalRep(key.privateExponent)),
            p: this.base64url(this.minimalRep(key.prime1)),
            q: this.base64url(this.minimalRep(key.prime2)),
            dp: this.base64url(this.minimalRep(key.exponent1)),
            dq: this.base64url(this.minimalRep(key.exponent2)),
            qi: this.base64url(this.minimalRep(key.coefficient))
        };
    },

    minimalRep: function (b) {
        var i = 0;
        while (b[i] === 0) {
            i++;
        }
        return b.slice(i);
    },

    ua2utf8: function (arrBuf) {
        var out, i, len, c;
        var char2, char3;

        const array = new Uint8Array(arrBuf);

        out = "";
        len = array.length || array.byteLength;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
                    break;
            }
        }

        return out;
    },

    base64url: function (b) {
        return base64js.fromByteArray(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    },

    /**
* Uint8Array/ArrayBuffer to hex String
*
* @param ua {Uint8Array} or ArrayBuffer
* @returns {String} Hex String
*/
    ua2hex: function (ua) {
        var s = '';
        ua = ua instanceof Uint8Array ? ua : new Uint8Array(ua);
        for (var i = 0; i < ua.length; i++) {
            var hhb = (ua[i] & 0xF0) >> 4;
            var lhb = ua[i] & 0x0F;
            s += String.fromCharCode(hhb > 9 ? hhb + 87 : hhb + 48);
            s += String.fromCharCode(lhb > 9 ? lhb + 87 : lhb + 48);
        }
        return s;
    },

    /**
* ArrayBuffer to String - resilient to large ArrayBuffers.
*
* @param arrBuf
* @returns {string}
*/
    ua2text: function (arrBuf) {
        var str = '';
        var ab = new Uint8Array(arrBuf);
        var abLen = ab.length;
        var CHUNK_SIZE = Math.pow(2, 8);
        var offset, len, subab;
        for (offset = 0; offset < abLen; offset += CHUNK_SIZE) {
            len = Math.min(CHUNK_SIZE, abLen - offset);
            subab = ab.subarray(offset, offset + len);
            str += String.fromCharCode.apply(null, subab);
        }
        return str;
    },

    hex2text: function (hexStr) {
        return this.ua2text(this.utils.hex2ua(hexStr));
    },

    text2hex: function (text) {
        return this.ua2hex(this.utils.text2ua(text));
    },

    asciiToArrayBuffer: function (str) {
        var chars = [];
        for (var i = 0; i < str.byte; ++i) {
            chars.push(str.charCodeAt(i));
        }
        return new Uint8Array(chars);
    },

    /**
* Builds a hex string representation of any array-like input (array or
* ArrayBufferView). The output looks like this:
*  [ab 03 4c 99]
*
* @param bytes
* @returns {string}
*/
    byteArrayToHexString: function (bytes) {
        var hexBytes = [];
        for (var i = 0; i < bytes.length; ++i) {
            var byteString = bytes[i].toString(16);
            if (byteString.length < 2) {
                byteString = '0' + byteString;
            }
            hexBytes.push(byteString);
        }
        return '[' + hexBytes.join(' ') + ']';
    },

    base64toByteArray: function (base64Data) {
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return byteArrays;
    },

    /**
*
* @param buffer1 {Uint8Array}
* @param buffer2{ Uint8Array}
* @returns {ArrayBuffer}
*/
    appendBuffer: function (buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
    }
}