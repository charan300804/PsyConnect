
'use client';

import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export default function LanguageSelector() {
  const { setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en-US')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('es-MX')}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('fr-FR')}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi-IN')}>
          हिन्दी (Hindi)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bn-IN')}>
          বাংলা (Bengali)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ta-IN')}>
          தமிழ் (Tamil)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('te-IN')}>
          తెలుగు (Telugu)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('mr-IN')}>
          मराठी (Marathi)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('gu-IN')}>
          ગુજરાતી (Gujarati)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('kn-IN')}>
          ಕನ್ನಡ (Kannada)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
