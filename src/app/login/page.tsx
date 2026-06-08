"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormField } from "@/components/ui/form-field";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-4xl">💰</div>
          </div>
          <CardTitle className="text-3xl font-bold">Finance OS</CardTitle>
          <CardDescription>
            Your comprehensive self-hosted financial command center.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4">
                <FormField label="Email">
                  <Input type="email" placeholder="m@example.com" />
                </FormField>
                <FormField label="Password">
                  <Input type="password" />
                </FormField>
                <Button className="w-full mt-2">Sign In</Button>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="space-y-4">
                <FormField label="Full Name">
                  <Input placeholder="John Doe" />
                </FormField>
                <FormField label="Email">
                  <Input type="email" placeholder="m@example.com" />
                </FormField>
                <FormField label="Password">
                  <Input type="password" />
                </FormField>
                <Button className="w-full mt-2">Create Account</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-xs text-center text-muted-foreground">
            Self-hosted, encrypted, and yours forever.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
