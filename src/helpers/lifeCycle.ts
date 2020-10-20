import { navtoRule, navErrorRule, hooksReturnRule} from '../options/base';
import { LifeCycleConfig, InstantiateConfig} from '../options/config';

export function registerHook(list:Array<Function>, fn:Function):Function {
    list.push(fn);
    return () => {
        const i = list.indexOf(fn);
        if (i > 0) list.splice(i, 1);
    };
}

export function registerRouterHooks<T extends LifeCycleConfig>(cycleHooks:T, options:InstantiateConfig):T {
    registerHook(cycleHooks.routerBeforeHooks, function(rule:navtoRule):hooksReturnRule {
        return new Promise((resolve:Function) => {
            (options.routerBeforeEach as Function)(rule, resolve);
        })
    })();
    registerHook(cycleHooks.routerAfterHooks, function(rule:navtoRule):void {
        (options.routerAfterEach as Function)(rule);
    })();
    registerHook(cycleHooks.routerErrorHooks, function(error:navErrorRule):void {
        (options.routerErrorEach as Function)(error);
    })();
    return cycleHooks;
}