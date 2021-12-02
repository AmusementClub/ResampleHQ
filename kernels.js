function e() {
    this.a = 1;
    this.description = "Simple, fast, purely linear filter with only a single lobe.";
    this.link = "http://en.wikipedia.org/wiki/Bilinear_interpolation";
    this.b = function(a) {
        a = Math.abs(a);
        return a < 1 ? 1 - a : 0
    }
}

function j(a, c, d) {
    this.a = 2;
    this.description = d;
    this.link = "http://en.wikipedia.org/wiki/Bicubic_interpolation";
    this.i = (6 - 2 * a) / 6;
    this.j = (-18 + 12 * a + 6 * c) / 6;
    this.k = (12 - 9 * a - 6 * c) / 6;
    this.m = (8 * a + 24 * c) / 6;
    this.n = (-12 * a - 48 * c) / 6;
    this.o = (6 * a + 30 * c) / 6;
    this.p = (-a - 6 * c) / 6;
    this.b = function(a) {
        a = Math.abs(a);
        if (a < 1) return this.i + a * a * (this.j + a * this.k);
        if (a < 2) return this.m + a * (this.n + a * (this.o + a * this.p));
        return 0
    }
}

function k(a) {
    this.a = a;
    this.description = a + "-lobe Lanczos filter.";
    this.link = "http://en.wikipedia.org/wiki/Lanczos_resampling";
    this.b = function(a) {
        a = Math.abs(a);
        if (a == 0) return 1;
        if (a >= this.a) return 0;
        a *= Math.PI;
        return this.a * Math.sin(a) * Math.sin(a / this.a) / (a * a)
    }
}

function l(a) {
    this.a = a;
    this.description = a + "-lobe Blackman filter.";
    this.link = "http://en.wikipedia.org/wiki/Window_function#Blackman_windows";
    this.b = function(a) {
        a = Math.abs(a);
        if (a == 0) return 1;
        if (a >= this.a) return 0;
        a *= Math.PI;
        return Math.sin(a) / a * (0.42 + 0.5 * Math.cos(a / this.a) + 0.08 * Math.cos(2 * a / this.a))
    }
}
var m = {
    Bilinear: new e,
    Blackman2: new l(2),
    Blackman3: new l(3),
    Blackman4: new l(4),
    "Catmull-Rom": new j(0, 0.5, "Bicubic with values b=0.0, c=0.5."),
    Gaussian: new function(a) {
        this.a = 4;
        this.link = "http://en.wikipedia.org/wiki/Window_function#Gaussian_windows";
        this.h = a;
        this.b = function(a) {
            a = Math.abs(a);
            return Math.pow(2, -(this.h * 0.1) * a * a)
        }
    }(30),
    Hermite: new j(0, 0, "Bicubic approximation of Bilinear with values b=0.0, c=0.0."),
    "Mitchell-Netravali": new j(1 / 3, 1 / 3, 'The "standard" Bicubic, with values b=1/3, c=1/3.'),
    Lanczos2: new k(2),
    Lanczos3: new k(3),
    Lanczos4: new k(4),
    Robidoux: new j(0.3782, 0.3109, "Bicubic with values b=0.3782, c=0.3109."),
    Sinc: new function(a) {
        this.a = a;
        this.description = "The perfect unwindowed Sinc filter, shown to 4 lobes.  Not really practical for much.";
        this.link = "http://en.wikipedia.org/wiki/Sinc_function";
        this.b = function(a) {
            a = Math.abs(a);
            if (a > 0) return a *= Math.PI, Math.sin(a) / a;
            return 1
        }
    }(4),
    SoftCubic50: new j(0.5, 0.5, "SoftCubic from MadVR.  Bicubic with values b=0.5, c=0.5."),
    SoftCubic75: new j(0.75,
        0.25, "SoftCubic from MadVR.  Bicubic with values b=0.75, c=0.25."),
    SoftCubic100: new j(1, 0, "SoftCubic from MadVR.  Bicubic with values b=1.0, c=0.0."),
    Spline16: new function() {
        this.a = 2;
        this.description = "2-lobe Spline filter from Avisynth.";
        this.link = "http://avisynth.org/mediawiki/Resize#Spline_based_resizers";
        this.b = function(a) {
            a = Math.abs(a);
            if (a < 1) return ((a - 1.8) * a - 0.2) * a + 1;
            if (a < 2) return ((-1 / 3 * (a - 1) + 0.8) * (a - 1) - 7 / 15) * (a - 1);
            return 0
        }
    },
    Spline36: new function() {
        this.a = 3;
        this.description = "3-lobe Spline filter from Avisynth.";
        this.link = "http://avisynth.org/mediawiki/Resize#Spline_based_resizers";
        this.b = function(a) {
            a = Math.abs(a);
            if (a < 1) return ((13 / 11 * a - 453 / 209) * a - 3 / 209) * a + 1;
            if (a < 2) return ((-6 / 11 * (a - 1) + 270 / 209) * (a - 1) - 156 / 209) * (a - 1);
            if (a < 3) return ((1 / 11 * (a - 2) - 45 / 209) * (a - 2) + 26 / 209) * (a - 2);
            return 0
        }
    },
    Spline64: new function() {
        this.a = 4;
        this.description = "4-lobe Spline filter from Avisynth.";
        this.link = "http://avisynth.org/mediawiki/Resize#Spline_based_resizers";
        this.b = function(a) {
            a = Math.abs(a);
            if (a < 1) return ((49 / 41 * a - 6387 / 2911) * a - 3 /
                2911) * a + 1;
            if (a < 2) return ((-24 / 41 * (a - 1) + 4032 / 2911) * (a - 1) - 2328 / 2911) * (a - 1);
            if (a < 3) return ((6 / 41 * (a - 2) - 1008 / 2911) * (a - 2) + 582 / 2911) * (a - 2);
            if (a < 4) return ((-1 / 41 * (a - 3) + 168 / 2911) * (a - 3) - 97 / 2911) * (a - 3);
            return 0
        }
    }
};

function n(a, c, d) {
    a /= 100;
    c /= 100;
    d *= Math.PI / 180;
    var b = c * Math.sin(d),
        c = Math.pow(a + c * Math.cos(d) / 5, 3),
        d = Math.pow(a, 3),
        b = Math.pow(a - b / 2, 3),
        f, a = Math.pow(Math.min(Math.max(3.241 * 0.9505 * c + -1.5374 * d + -0.5429754 * b, 0), 1), 1 / 2.2) * 100;
    f = Math.pow(Math.min(Math.max(-0.9212246 * c + 1.876 * d + 0.0453024 * b, 0), 1), 1 / 2.2) * 100;
    b = Math.pow(Math.min(Math.max(0.0528478 * c + -0.204 * d + 1.057 * 1.089 * b, 0), 1), 1 / 2.2) * 100;
    return "rgb(" + a + "%," + f + "%," + b + "%)"
}

function o(a) {
    var c = 0,
        d;
    for (d in a) ++c;
    return c
}

function p(a) {
    var c = a.canvas;
    a.clearRect(0, 0, c.width, c.height);
    a = c.width;
    c.width = 1;
    c.width = a
}
var q = 40;

function r(a) {
    var c = new e;
    this.f = this.g = this.d = 0;
    var d = a.b(0);
    for (i = 0; i <= 200; ++i) x = i / 200 * a.a, y = a.b(x) / d, ya = Math.abs(y) * a.a, this.d += y - c.b(x), this.g += ya, y < 0 && (this.f += ya)
}

function s(a, c, d, b) {
    var f = -252 / b.b(0),
        h = q + 512;
    a.beginPath();
    a.moveTo(-b.a * 128 + h, b.b(-b.a) * f + 256);
    for (i = -199; i <= 200; ++i) x = i / 200 * b.a, y = b.b(x), a.lineTo(x * 128 + h, y * f + 256);
    a.lineWidth = d;
    a.strokeStyle = c;
    a.stroke()
}
var t;

function v(a, c, d) {
    var b = document.getElementById(a).getContext("2d");
    p(b);
    var f = t * 20;
    b.beginPath();
    b.moveTo(0, 36);
    b.lineTo(f, 36);
    b.moveTo(0, 68);
    b.lineTo(f, 68);
    b.moveTo(0, 100);
    b.lineTo(f, 100);
    b.moveTo(0, 132);
    b.lineTo(f, 132);
    b.strokeStyle = "rgb(172,172,172)";
    b.stroke();
    b.fillStyle = "rgb(127,127,127)";
    b.font = "16px sans-serif";
    b.textAlign = "center";
    b.textBaseline = "top";
    b.fillText(a, f / 2, 140);
    var f = Number.MAX_VALUE,
        h = Number.MIN_VALUE;
    for (a in m) {
        var g = m[a],
            g = d(g);
        g < f && (f = g);
        g > h && (h = g)
    }
    f > 0 ? h -= f : f = 0;
    for (a in m) {
        var g =
            m[a],
            u = g.l,
            z = g.color,
            A = g.e,
            g = d(g),
            g = (g - f) / h * 128;
        if (a == c) b.fillStyle = n(85, 25, A), b.fillRect(u * 20 - 3, 132 - g - 3, 21, Math.abs(g) + 6);
        b.fillStyle = z;
        b.fillRect(u * 20, 132 - g, 15, g)
    }
}

function w(a, c, d, b) {
    p(a);
    a.scale(d, b);
    a.beginPath();
    a.moveTo(q + 128, 0);
    a.lineTo(q + 128, 320);
    a.moveTo(q + 256, 0);
    a.lineTo(q + 256, 320);
    a.moveTo(q + 384, 0);
    a.lineTo(q + 384, 320);
    a.moveTo(q + 512, 0);
    a.lineTo(q + 512, 320);
    a.moveTo(q + 640, 0);
    a.lineTo(q + 640, 320);
    a.moveTo(q + 768, 0);
    a.lineTo(q + 768, 320);
    a.moveTo(q + 896, 0);
    a.lineTo(q + 896, 320);
    a.moveTo(q + 0, 2);
    a.lineTo(q + 1024, 2);
    a.moveTo(q + 0, 128);
    a.lineTo(q + 1024, 128);
    a.moveTo(q + 0, 256);
    a.lineTo(q + 1024, 256);
    a.strokeStyle = "rgb(220,220,220)";
    a.stroke();
    a.fillStyle = "rgb(127,127,127)";
    a.font = "16px sans-serif";
    a.textAlign = "center";
    a.textBaseline = "top";
    a.save();
    a.rotate(90.01 * Math.PI / 180);
    a.fillText("Sample Weight", 160, -20);
    a.fillText("0.0", 256, -40);
    a.fillText("0.5", 128, -40);
    a.fillText("1.0", 12, -40);
    a.restore();
    a.fillText("0.0", q + 512, 320);
    a.fillText("1.0", q + 384, 320);
    a.fillText("1.0", q + 640, 320);
    a.fillText("2.0", q + 256, 320);
    a.fillText("2.0", q + 768, 320);
    a.fillText("3.0", q + 128, 320);
    a.fillText("3.0", q + 896, 320);
    a.fillText("4.0", q + 10, 320);
    a.fillText("4.0", q + 1012, 320);
    a.fillText("Sample Distance",
        q + 512, 320 + q / 2);
    var d = null,
        f;
    for (f in m) {
        var b = m[f],
            h = b.e,
            h = c ? n(85, 15, h) : b.color;
        f != c ? s(a, h, 2, b) : d = b
    }
    for (c = document.getElementById("kerneldesc"); c.hasChildNodes();) c.removeChild(c.lastChild);
    d && (s(a, "#fff", 14, d), s(a, d.color, 6, d), d.description && c.appendChild(document.createTextNode(d.description)))
}

function B(a) {
    var c = document.getElementById("canvas").getContext("2d");
    w(c, a, 1E3 / 1064, 357 / 380);
    v("Blurring", a, function(a) {
        return a.c.d
    });
    v("Sharpness", a, function(a) {
        return a.c.g
    });
    v("Ringing", a, function(a) {
        return a.c.f
    })
}

function C(a) {
    return function() {
        B(a)
    }
}
window.draw_all_kernels = function() {
    var a = document.getElementById("legend");
    t = o(m);
    var c = 0,
        d;
    for (d in m) {
        var b = c++,
            f = m[d],
            h = 360 * b / t,
            g = n(50, 75, h);
        f.c = new r(f);
        f.color = g;
        f.l = b;
        f.e = h;
        b = document.createElement("p");
        b.style.color = g;
        b.onmouseover = C(d);
        b.onmouseout = function() {
            B("")
        };
        b.appendChild(document.createTextNode(d));
        a.appendChild(b)
    }
    B(null)
};
