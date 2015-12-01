# phonygen.py
import random

vowels = ('a','e','i','o','u')
phony = ( 'b', 'c', 'd', 'f', 'g', 'h',  'j', 'k', 'l',
         'm', 'n',  'p', 'r', 's', 't',  'v', 'w', 'x', 'y',
         'z')

def genPhonym():
    return phony[random.randint(0, len(phony)-1)]+vowels[random.randint(0, len(vowels)-1)]

if __name__ == '__main__':
    for _ in range(5):
        password = ''.join([genPhonym() for _ in range(10)])
        print password
