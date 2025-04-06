'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export default function SettingsPage() {
    const [geminiKey, setGeminiKey] = useState("")
    const [profile, setProfile] = useState<{
        full_name: string | null
        email: string | null
        avatar_url: string | null
    } | null>(null)

    useEffect(() => {
        const savedKey = localStorage.getItem("gemini_api_key")
        if (savedKey) {
            setGeminiKey(savedKey)
        }

        const loadProfile = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                
                if (profile) {
                    setProfile(profile)
                }
            }
        }

        loadProfile()
    }, [])

    const handleSaveGeminiKey = () => {
        localStorage.setItem("gemini_api_key", geminiKey)
        toast.success("API key saved successfully")
    }

    const handleRemoveGeminiKey = () => {
        localStorage.removeItem("gemini_api_key")
        setGeminiKey("")
        toast.success("API key removed successfully")
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>
                
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    View your profile information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input 
                                        id="name" 
                                        value={profile?.full_name || ''} 
                                        disabled 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        value={profile?.email || ''} 
                                        disabled 
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="api-keys">
                        <Card>
                            <CardHeader>
                                <CardTitle>API Keys</CardTitle>
                                <CardDescription>
                                    Manage your API keys for external services. Note: Keys are stored in your browser's local storage.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gemini-key">Gemini API Key</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="gemini-key"
                                            type="password"
                                            value={geminiKey}
                                            onChange={(e) => setGeminiKey(e.target.value)}
                                            placeholder="Enter your Gemini API key"
                                        />
                                        <Button onClick={handleSaveGeminiKey}>Save</Button>
                                        {geminiKey && (
                                            <Button variant="destructive" onClick={handleRemoveGeminiKey}>Remove</Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}