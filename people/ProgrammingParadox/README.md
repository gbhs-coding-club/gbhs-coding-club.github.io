
# ProgrammingParadox

## To see how many lines of code
### JavaScript
Thanks to this StackOverflow question [here](https://stackoverflow.com/questions/1358540/how-can-i-count-all-the-lines-of-code-in-a-directory-recursively)
```
find . -name '*.js' | sed 's/.*/"&"/' | xargs  wc -l
```
