import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Gift,
  Music,
  HandHeart,
  ArrowRight,
  Camera,
  Play,
} from "lucide-react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // New state for single image view

  // Touch refs for swipe detection (refs update synchronously, avoiding stale state issues)
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  // Set tab title
  useEffect(() => {
    document.title = "Crossing Bridges with Jesus";
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Account for fixed header height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Construct mailto link
    const subject = encodeURIComponent(`New Message from Website: ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Open email client
    window.location.href = `mailto:jzmgarcia@yahoo.com?subject=${subject}&body=${body}`;

    setFormStatus("Opening your email client to send this message...");

    // Reset form after a brief delay
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setFormStatus("");
    }, 3000);
  };

  // Helper to check if a URL is a video
  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  // Navigation Logic for Lightbox
  const handleNextImage = (e) => {
    e?.stopPropagation();
    if (!selectedTrip || !selectedImage) return;
    const currentIndex = selectedTrip.gallery.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % selectedTrip.gallery.length;
    setSelectedImage(selectedTrip.gallery[nextIndex]);
  };

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    if (!selectedTrip || !selectedImage) return;
    const currentIndex = selectedTrip.gallery.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + selectedTrip.gallery.length) %
      selectedTrip.gallery.length;
    setSelectedImage(selectedTrip.gallery[prevIndex]);
  };

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage || !selectedTrip) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const currentIndex = selectedTrip.gallery.indexOf(selectedImage);
        const nextIndex = (currentIndex + 1) % selectedTrip.gallery.length;
        setSelectedImage(selectedTrip.gallery[nextIndex]);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const currentIndex = selectedTrip.gallery.indexOf(selectedImage);
        const prevIndex =
          (currentIndex - 1 + selectedTrip.gallery.length) %
          selectedTrip.gallery.length;
        setSelectedImage(selectedTrip.gallery[prevIndex]);
      }
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedTrip]);

  // Touch Event Handlers for Swipe
  const onTouchStart = (e) => {
    touchEndRef.current = null; // Reset touch end
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartRef.current === null || touchEndRef.current === null) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage();
    }
    if (isRightSwipe) {
      handlePrevImage();
    }

    // Reset refs after processing
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Navigation Items
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "mission", label: "Our Mission" },
    { id: "trips", label: "Mission Trips" },
    { id: "contact", label: "Get Involved" },
  ];

  // Data from Flyer
  const pastTrips = [
    {
      date: "June 22, 2024",
      title: "The First Crossing",
      desc: "Our ministry came alive! Launching with obedience to God's calling.",
      img: "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.28.jpeg",
      gallery: [
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.28.jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.28 copy.jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29.jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (1).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (2).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (3).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (4).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (5).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (6).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (7).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (8).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (9).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (10).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (11).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (12).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.29 (13).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30.jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (1).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (2).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (3).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (4).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (5).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (6).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (7).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (8).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (9).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (10).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (11).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (12).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (13).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.30 (14).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31.jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (1).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (2).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (3).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (4).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (5).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (6).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (7).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (8).jpeg",
        "/images/gallery/june2024/WhatsApp Image 2025-11-23 at 17.37.31 (9).jpeg",
        "/images/gallery/june2024/WhatsApp Video 2025-11-23 at 17.37.31.mp4",
        "/images/gallery/june2024/WhatsApp Video 2025-11-23 at 17.37.31 (1).mp4",
        "/images/gallery/june2024/WhatsApp Video 2025-11-23 at 17.37.31 (2).mp4",
      ],
    },
    {
      date: "August 24, 2024",
      title: "2nd Mission Trip",
      desc: "Back to school blessings and continued support.",
      img: "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.25.jpeg",
      gallery: [
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.25.jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26.jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (1).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (2).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (3).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (4).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (5).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (6).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (7).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (8).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (9).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (10).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (11).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (12).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.26 (13).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27.jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (1).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (2).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (3).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (4).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (5).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (6).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (7).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (8).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (9).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (10).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (11).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (12).jpeg",
        "/images/gallery/aug2024/WhatsApp Image 2025-11-23 at 17.47.27 (13).jpeg",
        "/images/gallery/aug2024/WhatsApp Video 2025-11-23 at 17.47.27.mp4",
        "/images/gallery/aug2024/WhatsApp Video 2025-11-23 at 17.47.28.mp4",
      ],
    },
    {
      date: "October 12, 2024",
      title: "3rd Mission Trip",
      desc: "Deepening connections and sharing the Word.",
      img: "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.35.jpeg",
      gallery: [
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.35.jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36.jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (1).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (2).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (3).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (4).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (5).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (6).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (7).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (8).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (9).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.36 (10).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37.jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (1).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (2).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (3).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (4).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (5).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (6).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (7).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (8).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (9).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (10).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (11).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (12).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.37 (13).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38.jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (1).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (2).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (3).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (4).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (5).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (6).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (7).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (8).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (9).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (10).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (11).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (12).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.38 (13).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39.jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (1).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (2).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (3).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (4).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (5).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (6).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (7).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (8).jpeg",
        "/images/gallery/oct2024/WhatsApp Image 2025-11-23 at 17.53.39 (9).jpeg",
        "/images/gallery/oct2024/WhatsApp Video 2025-11-23 at 17.53.39.mp4",
      ],
    },
    {
      date: "November 9, 2024",
      title: "4th Mission Trip",
      desc: "Thanksgiving preparations and gratitude.",
      img: "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07.jpeg",
      gallery: [
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07.jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 copy.jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (1).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (2).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (3).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (4).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (5).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (6).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (7).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.07 (8).jpeg",
        "/images/gallery/nov2024/WhatsApp Image 2025-11-23 at 17.58.08.jpeg",
        "/images/gallery/nov2024/WhatsApp Video 2025-11-23 at 17.58.08.mp4",
      ],
    },
    {
      date: "December 21, 2024",
      title: "5th Trip to TJ",
      desc: "Christmas joy for the orphans.",
      img: "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.35.jpeg",
      gallery: [
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.35.jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.37.jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.37 (1).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38.jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (1).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (2).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (3).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (4).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (5).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (6).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (7).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (8).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (9).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (10).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (11).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.38 (12).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39.jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (1).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (2).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (3).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (4).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (5).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (6).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (7).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (8).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (9).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (10).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (11).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (12).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.39 (13).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40.jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (1).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (2).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (3).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (4).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (5).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (6).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (7).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (8).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (9).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (10).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (11).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (12).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (13).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.40 (14).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41.jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41 (1).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41 (2).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41 (3).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41 (4).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41 (5).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41 (6).jpeg",
        "/images/gallery/dec2024/WhatsApp Image 2025-11-23 at 18.02.41 (7).jpeg",
        "/images/gallery/dec2024/WhatsApp Video 2025-11-23 at 18.02.41.mp4",
      ],
    },
    {
      date: "March 29, 2025",
      title: "Spring Mission Trip",
      desc: "Continued our service in the new year.",
      img: "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.57.jpeg",
      gallery: [
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.57.jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.58.jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.58 (1).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.58 (2).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59.jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (1).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (2).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (3).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (4).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (5).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (6).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (7).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (8).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (9).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (10).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (11).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (12).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.09.59 (13).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00.jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (1).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (2).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (3).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (4).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (5).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (6).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (7).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (8).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (9).jpeg",
        "/images/gallery/mar2025/WhatsApp Image 2025-11-23 at 18.10.00 (10).jpeg",
        "/images/gallery/mar2025/WhatsApp Video 2025-11-23 at 18.10.00.mp4",
      ],
    },
    {
      date: "May 17, 2025",
      title: "May Mission Trip",
      desc: "Served with love and compassion.",
      img: "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.34.jpeg",
      gallery: [
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.34.jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36.jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (1).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (2).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (3).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (4).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (5).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (6).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (7).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (8).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (9).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (10).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (11).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (12).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.36 (13).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37.jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (1).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (2).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (3).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (4).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (5).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (6).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (7).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (8).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (9).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (10).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (11).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (12).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (13).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.37 (14).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38.jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (1).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (2).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (3).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (4).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (5).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (6).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (7).jpeg",
        "/images/gallery/may2025/WhatsApp Image 2025-11-23 at 18.13.38 (8).jpeg",
        "/images/gallery/may2025/WhatsApp Video 2025-11-23 at 18.13.38.mp4",
        "/images/gallery/may2025/WhatsApp Video 2025-11-23 at 18.13.38 (1).mp4",
      ],
    },
    {
      date: "July 26, 2025",
      title: "Summer Mission Trip",
      desc: "Reached out to the children during summer break.",
      img: "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.45.jpeg",
      gallery: [
        "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.45.jpeg",
        "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.45 copy.jpeg",
        "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.46.jpeg",
        "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.46 (1).jpeg",
        "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.46 (2).jpeg",
        "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.46 (3).jpeg",
        "/images/gallery/july2025/WhatsApp Image 2025-11-23 at 18.16.46 (4).jpeg",
        "/images/gallery/july2025/WhatsApp Video 2025-11-23 at 18.16.46.mp4",
        "/images/gallery/july2025/WhatsApp Video 2025-11-23 at 18.16.46 (1).mp4",
        "/images/gallery/july2025/WhatsApp Video 2025-11-23 at 18.16.46 (2).mp4",
        "/images/gallery/july2025/WhatsApp Video 2025-11-23 at 18.16.46 (3).mp4",
        "/images/gallery/july2025/WhatsApp Video 2025-11-23 at 18.16.46 (4).mp4",
        "/images/gallery/july2025/WhatsApp Video 2025-11-23 at 18.16.47.mp4",
        "/images/gallery/july2025/WhatsApp Video 2025-11-23 at 18.16.47 (1).mp4",
      ],
    },
    {
      date: "November 15, 2025",
      title: "Thanksgiving Mission",
      desc: "Gave thanks and blessed the children for the holidays.",
      img: "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58.jpeg",
      gallery: [
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58.jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 copy.jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (1).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (1) copy.jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (2).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (3).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (4).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (5).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (6).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (7).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.58 (8).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59.jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (1).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (2).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (3).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (4).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (5).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (6).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (7).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (8).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (9).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (10).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (11).jpeg",
        "/images/gallery/nov2025/WhatsApp Image 2025-11-23 at 18.34.59 (12).jpeg",
        "/images/gallery/nov2025/WhatsApp Video 2025-11-23 at 18.34.59.mp4",
        "/images/gallery/nov2025/WhatsApp Video 2025-11-23 at 18.35.00.mp4",
      ],
    },
    {
      date: "December 20, 2025",
      title: "Upcoming Christmas Mission",
      desc: "Bringing the joy of Christmas to the children.",
      img: "/images/gallery/dec2025/591883964_122183248184471746_4323665419668544478_n.jpg",
      gallery: [
        "/images/gallery/dec2025/591883964_122183248184471746_4323665419668544478_n.jpg",
      ],
    },
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-amber-600" />,
      title: "Compassion",
      desc: "Serving with a pure heart.",
    },
    {
      icon: <Users className="w-6 h-6 text-amber-600" />,
      title: "Community",
      desc: "Connecting to share God's love.",
    },
    {
      icon: <HandHeart className="w-6 h-6 text-amber-600" />,
      title: "Stewardship",
      desc: "Managing resources to bless others.",
    },
    {
      icon: <Gift className="w-6 h-6 text-amber-600" />,
      title: "Generosity",
      desc: "Giving freely as we have received.",
    },
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <span className="text-xl md:text-2xl font-serif font-bold text-amber-600 tracking-wide">
                CROSSING BRIDGES WITH JESUS
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-slate-600 hover:text-amber-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("donate")}
                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
              >
                Donate
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-amber-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-md"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("donate")}
                className="w-full mt-2 bg-amber-500 text-white px-3 py-3 rounded-md text-base font-medium"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 flex-shrink-0">
        <div className="h-[600px] w-full relative overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2000&auto=format&fit=crop"
            alt="Volunteers helping children"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-center text-white">
            <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 uppercase">
              James 1:27
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Serving with the <br />{" "}
              <span className="text-amber-400">Heart of God</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-100 mb-10 font-light">
              "Pure and undefiled religion before God and the Father is this: to
              visit orphans and widows in their trouble and to keep oneself
              unspotted from the world."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-transform hover:scale-105 shadow-lg"
              >
                Join Our Next Trip
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <div className="bg-amber-600 text-white py-8 px-4 text-center">
        <p className="text-lg md:text-xl font-serif italic max-w-4xl mx-auto">
          "For many are called, but few are chosen."{" "}
          <span className="text-amber-200 not-italic text-sm ml-2 font-sans tracking-wider uppercase">
            — Matthew 22:14
          </span>
        </p>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder Image / Visual */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-amber-100 rounded-2xl z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1000&auto=format&fit=crop"
                alt="Jazmin Aguilar Founder"
                className="relative z-10 rounded-2xl shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20 max-w-xs hidden md:block">
                <p className="font-serif text-lg italic text-slate-700">
                  "Here I am Lord, send me."
                </p>
                <p className="text-amber-600 text-sm font-bold mt-2">
                  — Jazmin Aguilar
                </p>
              </div>
            </div>

            {/* Founder Story */}
            <div>
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                Established June 22, 2024
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-6">
                Our Story Begins with Obedience
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                God began to speak to our founder,{" "}
                <strong>Jazmin Aguilar</strong>, through His word and in dreams,
                calling her to seek after the orphans.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                With a heart full of faith, she responded,{" "}
                <em>"Here I am Lord, send me."</em> With the help of volunteer
                members from Free Chapel,{" "}
                <strong>Crossing Bridges with Jesus</strong> came alive to give
                God the glory.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-amber-500">
                  <h3 className="font-bold text-slate-800 mb-2">Our Vision</h3>
                  <p className="text-sm text-slate-600">
                    Serving with the heart of God. Where every child thrives,
                    feels accepted, and belongs.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="font-bold text-slate-800 mb-2">Our Mission</h3>
                  <p className="text-sm text-slate-600">
                    To meet a need, provide loving care, and empower children to
                    become future leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-800">
              Our Core Values
            </h2>
            <p className="text-slate-500 mt-2">
              Bible Based | In Faith | In Hope | With Respect
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="bg-amber-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do / Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-4">
              Our Ministry in Tijuana
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600">
              We focus on meeting both physical and spiritual needs, ensuring
              these children know they have a predestined purpose God created
              them for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800&auto=format&fit=crop"
                  alt="Food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                  <HandHeart size={20} />
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Nourishment
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Groceries & Meals
                </h3>
                <p className="text-slate-600">
                  We buy groceries and cook fresh, home-cooked meals, ensuring
                  every child goes to sleep with a full stomach.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                {/* NOTE: I am using a placeholder image here because I cannot access your local files in this preview.
                    
                    TO USE YOUR REAL PHOTO:
                    1. Save your photo as "worship.jpg" inside the "public" folder of your project.
                    2. Change the src below to: src="/worship.jpg"
                 */}
                <img
                  src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop"
                  alt="Worship - Bible"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // If the image fails, hide it and show the fallback text below
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback Display (Visible only if image breaks) */}
                <div className="hidden absolute inset-0 w-full h-full items-center justify-center bg-slate-100 text-slate-400">
                  <span className="text-sm font-medium">Worship Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                  <Music size={20} />
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Spiritual Growth
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Worship & The Word
                </h3>
                <p className="text-slate-600">
                  Teaching spiritual development and sharing the love of Jesus
                  through worship, prayer, and bible lessons.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                {/* NOTE: I am using a placeholder image here because I cannot access your local files in this preview.
                    
                    TO USE YOUR REAL PHOTO:
                    1. Save your photo as "gifts.jpg" inside the "public" folder of your project.
                    2. Change the src below to: src="/gifts.jpg"
                 */}
                <img
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop"
                  alt="Gifts and crafts on a table"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // If the image fails, hide it and show the fallback text below
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback Display (Visible only if image breaks) */}
                <div className="hidden absolute inset-0 w-full h-full items-center justify-center bg-slate-100 text-slate-400">
                  <span className="text-sm font-medium">Gifts Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                  <Gift size={20} />
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Joy
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Gifts & Activities
                </h3>
                <p className="text-slate-600">
                  Organizing games, children's activities, and bringing gifts to
                  let kids be kids and feel special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Timeline Section */}
      <section id="trips" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">
              Our Journey & Upcoming Trips
            </h2>
            <p className="text-slate-500 mt-2">
              Click on a trip to view photos!
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-slate-300 transform -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-4 h-full w-0.5 bg-slate-300 md:hidden"></div>

            <div className="space-y-12">
              {pastTrips.map((trip, index) => (
                <div
                  key={index}
                  // Add an ID to the last item so we can scroll to it
                  id={
                    index === pastTrips.length - 1 ? "timeline-end" : undefined
                  }
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Date Bubble (Center) */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full border-4 border-white shadow-sm z-10"></div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-right md:text-right">
                    <div
                      className={`${
                        index % 2 !== 0 ? "md:text-left md:pl-12 md:pr-0" : ""
                      }`}
                    >
                      <div
                        className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                        onClick={() => setSelectedTrip(trip)}
                      >
                        <span className="text-amber-600 font-bold text-sm tracking-wide block mb-1">
                          {trip.date}
                        </span>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          {trip.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">
                          {trip.desc}
                        </p>

                        {/* Placeholder for actual photo from flyer */}
                        <div className="w-full h-40 bg-slate-200 rounded-lg overflow-hidden relative">
                          <img
                            src={trip.img}
                            alt={trip.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Overlay on Hover */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <span className="flex items-center gap-2 font-semibold">
                              <Camera size={18} /> View Gallery
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer for alternating layout */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedTrip(null)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <span className="text-amber-600 font-bold text-sm tracking-wide uppercase">
                  {selectedTrip.date}
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-800">
                  {selectedTrip.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content - Scrollable Grid */}
            <div className="p-6 overflow-y-auto bg-slate-50">
              {selectedTrip.gallery && selectedTrip.gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedTrip.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-slate-200 rounded-xl overflow-hidden shadow-sm group relative cursor-pointer"
                      onClick={() => setSelectedImage(item)} // Open full image on click
                    >
                      {isVideo(item) ? (
                        <div className="w-full h-full relative bg-black">
                          <video
                            src={item}
                            className="w-full h-full object-cover"
                            controls={false} // Hide controls in grid preview
                            muted // Mute in preview
                            playsInline
                            preload="metadata"
                          />
                          {/* Video indicator icon (top right) */}
                          <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white pointer-events-none">
                            <Play size={14} fill="white" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-slate-500">
                  <Camera size={48} className="mx-auto mb-4 text-slate-300" />
                  <p>No photos available for this upcoming trip yet.</p>
                </div>
              )}
              <div className="mt-8">
                <h4 className="font-bold text-slate-800 mb-2">Trip Details</h4>
                <p className="text-slate-600">{selectedTrip.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[210]"
          >
            <X size={32} />
          </button>

          {/* Prev Button (Desktop) */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[210] hidden md:block"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button (Desktop) */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[210] hidden md:block"
          >
            <ChevronRight size={32} />
          </button>

          <div
            className="w-full h-full flex items-center justify-center p-4 md:px-16"
            onClick={() => setSelectedImage(null)}
          >
            {isVideo(selectedImage) ? (
              <video
                src={selectedImage}
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video controls
              />
            ) : (
              <img
                src={selectedImage}
                alt="Full screen view"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              />
            )}
          </div>
        </div>
      )}

      {/* CTA / Donate Section */}
      <section
        id="contact"
        className="py-20 bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Get Involved
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Are you ready to build the leaders of tomorrow? We need cooks,
                worship leaders, and generous hearts.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-slate-300">714-310-6167</p>
                    <p className="text-sm text-slate-500">Jazmin Aguilar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-slate-300">jzmgarcia@yahoo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Calendar className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Upcoming Mission</h4>
                    <p className="text-slate-300">
                      Next Trip to TJ: December 20, 2025
                    </p>
                    {/* Updated Button: Now scrolls to the END of the timeline */}
                    <button
                      onClick={() => scrollToSection("timeline-end")}
                      className="mt-2 text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1"
                    >
                      View Calendar <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <a
                  href="https://www.facebook.com/crossingbridgeswjesus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="font-bold">f</span> Jazmin Aguilar-Crossing
                  Bridges with Jesus
                </a>
              </div>
            </div>

            {/* Donation / Contact Form Card */}
            <div className="bg-white text-slate-800 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="I'd like to volunteer..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
                >
                  Send Message
                </button>
                {formStatus && (
                  <p className="text-center text-sm text-green-600 font-medium mt-2 animate-in fade-in">
                    {formStatus}
                  </p>
                )}
              </form>

              <div id="donate" className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-center text-sm font-semibold text-slate-500 mb-3">
                  Support the Mission
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Zelle (Display Only) */}
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors group">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                      Zelle
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-amber-600 transition-colors select-all text-sm lg:text-base">
                      470-484-0033
                    </span>
                  </div>

                  {/* Venmo Link */}
                  <a
                    href="https://venmo.com/Demetree-Fraley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
                      Venmo
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-blue-500 transition-colors select-all text-sm lg:text-base text-center">
                      Demetree-Fraley
                    </span>
                  </a>

                  {/* Cash App Link */}
                  <a
                    href="https://cash.app/$DemetreeFraley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">
                      Cash App
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-green-600 transition-colors text-sm lg:text-base">
                      $DemetreeFraley
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-8 text-center text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Crossing Bridges with Jesus. All
            rights reserved.
          </p>
          <p>Founded by Jazmin Aguilar | Tijuana, Mexico Mission</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
