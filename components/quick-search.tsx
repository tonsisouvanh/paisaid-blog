// 'use client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Search } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// const QuickSearch = () => {
//   const router = useRouter();
//   const [query, setQuery] = useState<string>('');
//   return (
//     <div className="relative mx-auto w-full max-w-md">
//       <div className="flex items-center overflow-hidden rounded-full bg-white p-1 shadow-lg">
//         <Search className="ml-3 h-5 w-5 text-muted-foreground" />
//         <Input
//           type="search"
//           value={query}
//           onChange={e => setQuery(e.target.value)}
//           placeholder="Search places..."
//           className="h-10 flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//         />
//         <Button onClick={() => router.push(`/search?q=${query}`)} size="sm" className="rounded-full">
//           Search
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default QuickSearch;
'use client';

import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Loader2, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface QuickSearchProps {
  suggestions?: string[];
  maxRecentSearches?: number;
  className?: string;
  onSearch?: (query: string) => void;
}

const QuickSearch = ({
  suggestions = [
    'Popular destination',
    'Best restaurants',
    'Tourist attractions',
    'Local events',
    'Historic sites',
    'Museums',
    'Parks and recreation',
    'Shopping centers',
  ],
  maxRecentSearches = 5,
  className,
  onSearch,
}: QuickSearchProps) => {
  const router = useRouter();
  const [query, setQuery] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    }
    return [];
  });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState(suggestions);

  React.useEffect(() => {
    const newFilteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    if (JSON.stringify(newFilteredSuggestions) !== JSON.stringify(filteredSuggestions)) {
      setFilteredSuggestions(newFilteredSuggestions);
    }
  }, [query, suggestions, filteredSuggestions]);

  const addToRecentSearches = React.useCallback(
    (searchQuery: string) => {
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, maxRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        return updated;
      });
    },
    [maxRecentSearches]
  );

  const clearRecentSearches = React.useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      addToRecentSearches(searchQuery);
      onSearch?.(searchQuery);
      await router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch(query);
    }
  };

  return (
    <div className={cn('relative mx-auto w-full max-w-md', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className="group flex items-center overflow-hidden rounded-full bg-white/80 p-1 shadow-lg backdrop-blur-md transition-all hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="search-suggestions"
          >
            <Search className="ml-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
            <Input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search places..."
              className="h-10 flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label="Search input"
            />
            {/* {query && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-1 h-6 w-6"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )} */}
            <Button
              onClick={() => handleSearch(query)}
              size="sm"
              className="rounded-full transition-transform hover:scale-105 active:scale-95"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <Command>
            <CommandList id="search-suggestions">
              {recentSearches.length > 0 && (
                <CommandGroup
                  heading={
                    <div className="flex items-center justify-between">
                      <span>Recent Searches</span>
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-xs" onClick={clearRecentSearches}>
                        Clear all
                      </Button>
                    </div>
                  }
                >
                  <ScrollArea className="h-[100px]">
                    {recentSearches.map(recent => (
                      <CommandItem
                        key={recent}
                        value={recent}
                        onSelect={() => {
                          setQuery(recent);
                          handleSearch(recent);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {recent}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              )}
              <CommandGroup heading="Suggestions">
                <ScrollArea className="h-[200px]">
                  {filteredSuggestions.length === 0 ? (
                    <CommandEmpty>No results found.</CommandEmpty>
                  ) : (
                    filteredSuggestions.map(suggestion => (
                      <CommandItem
                        key={suggestion}
                        value={suggestion}
                        onSelect={() => {
                          setQuery(suggestion);
                          handleSearch(suggestion);
                        }}
                      >
                        {suggestion}
                      </CommandItem>
                    ))
                  )}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default QuickSearch;
