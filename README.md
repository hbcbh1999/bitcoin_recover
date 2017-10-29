# bitcoin_recovery

## Purpose

If you are lamenting losing a secret key to your Bitcoin wallet on an unencrypted drive failure or Virtual Box image failure but your Bitcoin secret ket is somewhere on the drive, lament no further.

If you have the lost Bitcoin wallet address, this tool will help scan your entire drive for the secret key using a brute force search.


To use run:
```
$ npm install
$ node findkey.js bitcoin_address recovery_medium [-f]
where optional parameter [-f] specifies to run quick scan
```

i.e.

```
$ node findkey.js '1E7FPtSfkqUnYF5UuXhyKusBAwLRtPoUsi' './vboximage.vbi' -f
```

Version 3.0

- Can scan large image files by reading in incremental chunks.
- Sequential chunks are checked plus the tail of the previous chunk, to 
  check for keys that may span across 2 chunk boundaries.
<<<<<<< HEAD
- Fast scan for failed drives with old bitcoin wallet files [1] 
=======
- Fast scan for failed drives with old bitcoin wallet files 

>>>>>>> dc01b09... Update README.md
[1] https://bitcointalk.org/index.php?topic=25091.55;wap
