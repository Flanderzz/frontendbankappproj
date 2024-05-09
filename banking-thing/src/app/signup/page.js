"use client";

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"


export default function signup() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [zipcode, setZipcode] = useState("")

    const handleSignUp = async () => {
        try {
            const name = firstName + " " + lastName
            const response = await fetch("https://bank-app-bankend.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone,
                    state,
                    city,
                    streetAddress,
                    zipcode
                })
            })

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                setTimeout(() => {
                    localStorage.removeItem("token");
                }, 60 * 60 * 1000); // Remove token after 1 hour (60 minutes * 60 seconds * 1000 milliseconds)
                router.push("/");
            } else {
                console.error("Sign up failed")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/"); // Replace "/home" with the actual home page URL
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                <Link className="lg:hidden" href="#">
                    <BanknoteIcon className="h-6 w-6" />
                    <span className="sr-only">Home</span>
                </Link>
                <div className="w-full flex-1">
                    <div className="relative">
                        <BanknoteIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950" disabled placeholder="Banking App" type="text" />
                    </div>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="mx-auto max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="John" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Doe" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="m@example.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="123-456-7890" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" placeholder="California" required value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Los Angeles" required value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="street-address">Street Address</Label>
                            <Input id="street-address" placeholder="123 Main St" required value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipcode">Zipcode</Label>
                            <Input id="zipcode" placeholder="90001" required type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                        </div>
                        <Button className="w-full" type="submit" onClick={handleSignUp}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function BanknoteIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
        </svg>
    );
}

// export default function signup() {
//   return (
//     (<div className="flex flex-col min-h-screen w-full">
//       <header
//         className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
//         <Link className="lg:hidden" href="#">
//           <BanknoteIcon className="h-6 w-6" />
//           <span className="sr-only">Home</span>
//         </Link>
//         <div className="w-full flex-1">
//           <div className="relative">
//             <BanknoteIcon
//               className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//             <Input
//               className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
//               disabled
//               placeholder="Banking App"
//               type="text" />
//           </div>
//         </div>
//       </header>
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//         <div className="mx-auto max-w-md space-y-6">
//           <div className="space-y-2 text-center">
//             <h1 className="text-3xl font-bold">Sign Up</h1>
//             <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
//           </div>
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="first-name">First Name</Label>
//                 <Input id="first-name" placeholder="John" required />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="last-name">Last Name</Label>
//                 <Input id="last-name" placeholder="Doe" required />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" placeholder="m@example.com" required type="email" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" required type="password" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone</Label>
//               <Input id="phone" placeholder="123-456-7890" required type="tel" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="state">State</Label>
//                 <Input id="state" placeholder="California" required />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="city">City</Label>
//                 <Input id="city" placeholder="Los Angeles" required />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="street-address">Street Address</Label>
//               <Input id="street-address" placeholder="123 Main St" required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="zipcode">Zipcode</Label>
//               <Input id="zipcode" placeholder="90001" required type="text" />
//             </div>
//             <Button className="w-full" type="submit">
//               Sign Up
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>)
//   );
// }

// function BanknoteIcon(props) {
//   return (
//     (<svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <rect width="20" height="12" x="2" y="6" rx="2" />
//       <circle cx="12" cy="12" r="2" />
//       <path d="M6 12h.01M18 12h.01" />
//     </svg>)
//   );
// }
