'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MetadataManipulator() {
  const [lnkFile, setLnkFile] = useState('')
  const [operation, setOperation] = useState('')
  const [value, setValue] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would call a server-side API to execute LECmd.exe
    // For demonstration purposes, we'll simulate the operation
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResult({ 
        success: true, 
        message: `Operation ${operation} completed successfully on ${lnkFile}`
      })
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'An error occurred while processing the request.'
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">LNK File Metadata Manipulator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="lnk-file">LNK File Path</Label>
          <Input 
            id="lnk-file" 
            value={lnkFile} 
            onChange={(e) => setLnkFile(e.target.value)}
            placeholder="C:\Users\Public\Desktop\myfile.lnk"
            required
          />
        </div>
        <div>
          <Label htmlFor="operation">Operation</Label>
          <Select onValueChange={setOperation} required>
            <SelectTrigger id="operation">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Change File Name</SelectItem>
              <SelectItem value="date">Change File Date</SelectItem>
              <SelectItem value="size">Change File Size</SelectItem>
              <SelectItem value="path">Change File Path</SelectItem>
              <SelectItem value="icon">Change File Icon</SelectItem>
              <SelectItem value="target">Change File Target</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="value">New Value</Label>
          <Input 
            id="value" 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter new value"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="hidden" 
            checked={isHidden}
            onCheckedChange={(checked) => setIsHidden(checked as boolean)}
          />
          <Label htmlFor="hidden">Set file as hidden</Label>
        </div>
        <Button type="submit">Execute Operation</Button>
      </form>
      {result && (
        <Alert variant={result.success ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}