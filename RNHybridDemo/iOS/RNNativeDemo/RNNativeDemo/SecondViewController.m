//
//  SecondViewController.m
//  RNNativeDemo
//
//  Created by ZDQ on 2019/9/12.
//  Copyright © 2019 zdq. All rights reserved.
//

#import "SecondViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTEventEmitter.h>

@interface SecondViewController ()

@end

@implementation SecondViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initRCTRootView];
    self.navigationItem.title = @"RN页面";
}
- (void)initRCTRootView{
    NSURL *jsCodeLocation;
    //1,开发环境，调试状态
     jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
    //2,发布环境 release之后从包中读取名为main的静态js bundle
    //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    
    //3,通过RCTBundleURLProvider生成，用于开发环境
    //jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    
    //这个"App1"名字一定要和我们在index.js中注册的名字保持一致
    NSDictionary * dict = @{@"version": @"2.20.1"};
    RCTRootView *rootView =[[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName: @"App2" initialProperties:dict launchOptions: nil];
    self.view=rootView;
}



@end
