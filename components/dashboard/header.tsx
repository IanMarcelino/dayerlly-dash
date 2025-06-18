'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, TrendingUp } from 'lucide-react'

interface DashboardHeaderProps {
  userEmail: string
}

export function DashboardHeader({ userEmail }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('affiliate_session')
    router.push('/')
  }



  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Affiliate Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome Back {userEmail}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium">
                </AvatarFallback>
              </Avatar> */}
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {userEmail}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}