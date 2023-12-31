import { hashSync, compareSync, genSaltSync } from "bcrypt";

export function hashing (phrase) {
    return hashSync(phrase, genSaltSync(10))
}

export function hashedAreEquals(received, stored) {
    return compareSync(received, stored)
}