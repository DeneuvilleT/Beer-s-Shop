import { check_user } from '../../controllers/page.controller';
import authRequest from '../../middleware/auth';
import express from 'express';


const router = express.Router();


router.get("/checkLog", authRequest, check_user)