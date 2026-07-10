import rateLimit from "express-rate-limit";  
import { RedisStore } from "rate-limit-redis";  
import redisClient from "../config/redis"; 
import { Request, Response } from "express";
 

function createStore(prefix: string){
    return new RedisStore({  
        sendCommand: (...args: string[]) =>  
        redisClient.sendCommand(args), prefix,
    });
}

function rateLimitHandler(req: Request, res: Response){
    res.status(429).json({
        success: false,
        message: "Too many request"
    });
}

 
export function createGlobalLimiter(){
    return rateLimit({
        windowMs: 10*1000,
        limit: 3,
        standardHeaders: true,
        legacyHeaders: false,
        store:createStore("rl:global:"),
        handler: rateLimitHandler,
    });
}

export function createAuthLimiter(){
    return rateLimit({
        windowMs: 10*1000,
        limit: 3,
        standardHeaders: true,
        legacyHeaders: false,
        store:createStore("rl:auth:"),
        handler: rateLimitHandler,
    });
}
