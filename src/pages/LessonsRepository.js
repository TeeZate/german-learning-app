import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Box, Grid, Paper, Tabs, Tab, 
  TextField, InputAdornment, MenuItem, Select, FormControl,
  InputLabel, Chip, IconButton, Tooltip, Pagination,
  FormControlLabel, Switch, Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MotionDiv, staggerContainer, slideUp, fadeIn } from "../utils/animations";
import { useUser } from "../context/UserContext";
import LessonCard from "../components/LessonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock lessons data - expanded for repository page
const allLessonsData = [
  {
    id: 1,
    title: "Basic Greetings",
    description: "Learn how to greet people in German and introduce yourself.",
    difficulty: "Easy",
    category: "Beginner",
    duration: 15,
    tags: ["vocabulary", "conversation"],
    popularity: 95
  },
  {
    id: 2,
    title: "Numbers and Counting",
    description: "Master numbers from 1-100 and basic counting in German.",
    difficulty: "Easy",
    category: "Beginner",
    duration: 20,
    tags: ["vocabulary", "numbers"],
    popularity: 90
  },
  {
    id: 3,
    title: "Common Phrases",
    description: "Essential phrases for everyday conversations in German.",
    difficulty: "Easy",
    category: "Beginner",
    duration: 25,
    tags: ["vocabulary", "conversation", "phrases"],
    popularity: 88
  },
  {
    id: 4,
    title: "Present Tense Verbs",
    description: "Learn how to conjugate regular and irregular verbs in the present tense.",
    difficulty: "Medium",
    category: "Intermediate",
    duration: 30,
    tags: ["grammar", "verbs"],
    popularity: 85
  },
  {
    id: 5,
    title: "Food and Dining",
    description: "Vocabulary and phrases for ordering food and dining out.",
    difficulty: "Medium",
    category: "Intermediate",
    duration: 25,
    tags: ["vocabulary", "conversation", "food"],
    popularity: 82
  },
  {
    id: 6,
    title: "Past Tense",
    description: "Master the past tense forms in German.",
    difficulty: "Hard",
    category: "Advanced",
    duration: 40,
    tags: ["grammar", "verbs", "tenses"],
    popularity: 78
  },
  {
    id: 7,
    title: "Family Members",
    description: "Learn vocabulary for family relationships and discussing your family.",
    difficulty: "Easy",
    category: "Beginner",
    duration: 20,
    tags: ["vocabulary", "family"],
    popularity: 86
  },
  {
    id: 8,
    title: "Weather and Seasons",
    description: "Vocabulary and phrases to discuss weather and seasons in German.",
    difficulty: "Easy",
    category: "Beginner",
    duration: 25,
    tags: ["vocabulary", "weather"],
    popularity: 80
  },
  {
    id: 9,
    title: "Modal Verbs",
    description: "Learn how to use modal verbs to express ability, permission, and obligation.",
    difficulty: "Medium",
    category: "Intermediate",
    duration: 35,
    tags: ["grammar", "verbs", "modal"],
    popularity: 75
  },
  {
    id: 10,
    title: "Dative Case",
    description: "Master the dative case and its applications in German sentences.",
    difficulty: "Hard",
    category: "Advanced",
    duration: 45,
    tags: ["grammar", "cases"],
    popularity: 70
  },
  {
    id: 11,
    title: "Travel Vocabulary",
    description: "Essential words and phrases for traveling in German-speaking countries.",
    difficulty: "Medium",
    category: "Intermediate",
    duration: 30,
    tags: ["vocabulary", "travel"],
    popularity: 88
  },
  {
    id: 12,
    title: "Subjunctive Mood",
    description: "Learn how to express hypothetical situations and wishes in German.",
    difficulty: "Hard",
    category: "Advanced",
    duration: 50,
    tags: ["grammar", "advanced"],
    popularity: 65
  }
];

const LessonsRepository = () => {
  const navigate = useNavigate();
  const { isLoading } = useUser();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [sortBy, setSortBy] = useState("popularity");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [lessonsPerPage] = useState(6);
  const [bookmarkedLessons, setBookmarkedLessons] = useState([]);

  // All available tags from lessons
  const allTags = [...new Set(allLessonsData.flatMap(lesson => lesson.tags))];

  useEffect(() => {
    // Simulate API call to fetch lessons
    setTimeout(() => {
      setLessons(allLessonsData);
      // Simulate bookmarked lessons (in a real app, this would come from user data)
      setBookmarkedLessons([1, 4]);
      setLoadingLessons(false);
    }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
    setPage(1); // Reset to first page when changing filters
  };

  const toggleBookmarkOnly = () => {
    setBookmarkedOnly(!bookmarkedOnly);
    setPage(1); // Reset to first page when toggling bookmarks
  };

  const toggleBookmark = (lessonId) => {
    setBookmarkedLessons(prev => 
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter lessons based on tab, search query, tags, and bookmarks
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => lesson.tags.includes(tag));
    
    const matchesBookmark = !bookmarkedOnly || bookmarkedLessons.includes(lesson.id);
    
    if (tabValue === 0) {
      return matchesSearch && matchesTags && matchesBookmark; // All lessons
    } else if (tabValue === 1) {
      return lesson.category === "Beginner" && matchesSearch && matchesTags && matchesBookmark;
    } else if (tabValue === 2) {
      return lesson.category === "Intermediate" && matchesSearch && matchesTags && matchesBookmark;
    } else if (tabValue === 3) {
      return lesson.category === "Advanced" && matchesSearch && matchesTags && matchesBookmark;
    }
    
    return matchesSearch && matchesTags && matchesBookmark;
  });

  // Sort filtered lessons
  const sortedLessons = [...filteredLessons].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "duration") {
      return a.duration - b.duration;
    } else if (sortBy === "difficulty") {
      const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    return 0;
  });

  // Paginate lessons
  const indexOfLastLesson = page * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = sortedLessons.slice(indexOfFirstLesson, indexOfLastLesson);
  const totalPages = Math.ceil(sortedLessons.length / lessonsPerPage);

  if (isLoading || loadingLessons) {
    return <LoadingSpinner message="Loading lessons repository..." />;
  }

  return (
    <MotionDiv
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Lessons Repository
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ maxWidth: '800px' }}>
            Browse our complete collection of German language lessons. Filter by level, topic, or search for specific content to find exactly what you need.
          </Typography>
        </Container>
        
        {/* Decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -50, 
            right: -50, 
            width: 200, 
            height: 200, 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }} 
        />
      </Box>

      {/* Lessons Repository Section */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Lessons" />
            <Tab label="Beginner" />
            <Tab label="Intermediate" />
            <Tab label="Advanced" />
          </Tabs>
        </Paper>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search lessons..."
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="title">Title (A-Z)</MenuItem>
                <MenuItem value="duration">Duration (Shortest First)</MenuItem>
                <MenuItem value="difficulty">Difficulty (Easiest First)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Toggle Filters">
                <IconButton 
                  onClick={toggleFilter}
                  color={filterOpen ? "primary" : "default"}
                  sx={{ 
                    border: 1, 
                    borderColor: 'divider',
                    height: '56px',
                    width: '56px'
                  }}
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={bookmarkedOnly} 
                    onChange={toggleBookmarkOnly}
                    color="primary"
                  />
                }
                label="Bookmarked Only"
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  borderRadius: 1,
                  px: 2,
                  flexGrow: 1,
                  height: '56px'
                }}
              />
            </Box>
          </Grid>
        </Grid>
        
        {/* Tags filter section */}
        {filterOpen && (
          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Filter by Tags:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {allTags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagToggle(tag)}
                  color={selectedTags.includes(tag) ? "primary" : "default"}
                  variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                />
              ))}
            </Box>
          </Paper>
        )}
        
        {/* Results summary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {currentLessons.length} of {sortedLessons.length} lessons
            {tabValue > 0 && ` in ${tabValue === 1 ? 'Beginner' : tabValue === 2 ? 'Intermediate' : 'Advanced'} level`}
            {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
            {bookmarkedOnly && ' (bookmarked only)'}
          </Typography>
          
          {selectedTags.length > 0 && (
            <Button 
              variant="text" 
              size="small"
              onClick={() => setSelectedTags([])}
            >
              Clear Filters
            </Button>
          )}
        </Box>
        
        {/* Lessons grid */}
        {currentLessons.length > 0 ? (
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3, // spacing between cards
                mt: 2,
              }}
            >
              {currentLessons.map((lesson) => (
                <MotionDiv
                  key={lesson.id}
                  variants={slideUp}
                  style={{
                    flex: '1 1 calc(25% - 24px)', // 4 per row with 24px gap (gap=3)
                    boxSizing: 'border-box',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <LessonCard lesson={lesson} />
                    <IconButton
                      onClick={() => toggleBookmark(lesson.id)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': {
                          bgcolor: 'background.paper',
                        },
                        zIndex: 1,
                      }}
                    >
                      {bookmarkedLessons.includes(lesson.id) ? (
                        <BookmarkIcon color="primary" />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </IconButton>
                  </Box>
                </MotionDiv>
              ))}
            </Box>
          </MotionDiv>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No lessons found matching your search criteria.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => {
                setSearchQuery("");
                setTabValue(0);
                setSelectedTags([]);
                setBookmarkedOnly(false);
              }}
              sx={{ mt: 2 }}
            >
              Clear All Filters
            </Button>
          </Paper>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>

      {/* Additional Information Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                How to Use the Repository
              </Typography>
              <Typography variant="body1" paragraph>
                Our lesson repository contains all available German language lessons organized by difficulty level and topic. Here's how to make the most of it:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    <strong>Filter by level:</strong> Choose between Beginner, Intermediate, and Advanced lessons.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    <strong>Search:</strong> Find specific topics or keywords within lessons.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    <strong>Filter by tags:</strong> Select specific topics like grammar, vocabulary, or conversation.
                  </Typography>
                </Box>
                <Box component="li">
                  <Typography variant="body1">
                    <strong>Bookmark:</strong> Save lessons for quick access later.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                Learning Path Recommendations
              </Typography>
              <Typography variant="body1" paragraph>
                Not sure where to start? Here are some recommended learning paths:
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  For Complete Beginners:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start with Basic Greetings → Numbers and Counting → Common Phrases → Family Members
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  For Grammar Focus:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Present Tense Verbs → Modal Verbs → Past Tense → Dative Case
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  For Travel Preparation:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Basic Greetings → Food and Dining → Travel Vocabulary → Weather and Seasons
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MotionDiv>
  );
};

export default LessonsRepository;
