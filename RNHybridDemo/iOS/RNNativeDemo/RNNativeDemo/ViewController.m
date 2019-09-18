//
//  ViewController.m
//  RNNativeDemo
//
//  Created by ZDQ on 2019/9/11.
//  Copyright © 2019 zdq. All rights reserved.
//

#import "ViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import "SecondViewController.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"原生页面";
}
- (IBAction)btnClick:(id)sender {
    SecondViewController * vc = [SecondViewController new];
    [self.navigationController pushViewController:vc animated:YES];
}



@end
