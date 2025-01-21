# Google JavaScript Style Guide

> **Note**: This guide is no longer being updated. Google recommends migrating to TypeScript, and following the [TypeScript guide](tsguide.html).

## 1 Introduction

This document serves as the **complete** definition of Google’s coding standards for source code in the JavaScript programming language. A JavaScript source file is described as being _in Google Style_ if and only if it adheres to the rules herein.

Like other programming style guides, the issues covered span not only aesthetic issues of formatting but other types of conventions or coding standards as well. However, this document focuses primarily on the hard-and-fast rules that we follow universally and avoids giving advice that isn't clearly enforceable (whether by human or tool).

### 1.1 Terminology notes

In this document, unless otherwise clarified:

1. The term _comment_ always refers to _implementation_ comments. We do not use the phrase “documentation comments,” instead using the common term “JSDoc” for both human-readable text and machine-readable annotations within `/** … */`.

2. This Style Guide uses [RFC 2119](http://tools.ietf.org/html/rfc2119) terminology when using the phrases _must_, _must not_, _should_, _should not_, and _may_. The terms _prefer_ and _avoid_ correspond to _should_ and _should not_, respectively. Imperative and declarative statements are prescriptive and correspond to _must_.

Other “terminology notes” will appear occasionally throughout the document.

```javascript
/* Best: perfectly clear even without a comment. */
const units = "μs";

/* Allowed: but unnecessary as μ is a printable character. */
const units = "\u03bcs"; // 'μs'

/* Good: use escapes for non-printable characters with a comment for clarity. */
return "\ufeff" + content; // Prepend a byte order mark.
```
