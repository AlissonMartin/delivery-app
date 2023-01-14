import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import { validationResult, matchedData } from "express-validator"
import State from "../models/State"
import  User  from '../models/User'
import dotenv from 'dotenv'

