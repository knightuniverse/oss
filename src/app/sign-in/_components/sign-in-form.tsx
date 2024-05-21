"use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { signIn } from "@/lib/services/authentication-service";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { clsx } from "clsx";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const SignInCredential = z.object({
//   password: z.string().min(1),
//   phone: z.string().min(1),
// });

// type ISignInCredential = z.infer<typeof SignInCredential>; // string

// export function SignInForm() {
//   const router = useRouter();

//   // 1. Define your form.
//   const form = useForm<ISignInCredential>({
//     resolver: zodResolver(SignInCredential),
//     defaultValues: {
//       password: "",
//       phone: "",
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: ISignInCredential) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log("onSubmit", values);

//     await signIn(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field, fieldState }) => (
//             <FormItem>
//               <FormLabel
//                 className={clsx({
//                   "text-foreground": fieldState.invalid,
//                 })}
//               >
//                 Phone
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   className={clsx({
//                     "border-destructive-foreground focus-visible:ring-0":
//                       fieldState.invalid,
//                   })}
//                   placeholder="Phone"
//                   {...field}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input placeholder="Password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Sign In</Button>
//       </form>
//     </Form>
//   );
// }

import { signIn } from "@/lib/services/authentication-service";
import { Button, Form, Input } from "antd";

// const { Password } = Input;

export function SignInForm() {
  const [form] = Form.useForm();

  // const router = useRouter();

  async function onSubmit(values: { password: string; phone: string }) {
    await signIn(values);
  }

  return (
    <Form layout="vertical" form={form} initialValues={{}} onFinish={onSubmit}>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input placeholder="Phone" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          SignIn
        </Button>
      </Form.Item>
    </Form>
  );
}
