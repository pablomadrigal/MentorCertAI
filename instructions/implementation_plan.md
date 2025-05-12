# Implementation Plan - MentorCertAi (MVP)

**Project:** MentorCertAi - Plataforma de Mentorías 1a1 con Certificación Blockchain en Starknet (MVP)
**Date:** 12 de Mayo de 2025
**Duration:** 15 días

## 1.  Introduction

This document outlines the implementation plan for the MentorCertAi MVP, focusing on delivering core functionalities within the 15-day timeframe. It prioritizes agile development principles, iterative progress, and continuous testing.  This plan references `spec.md`, `plan.md`, and `app_flow.md`.

## 2.  Timeline Breakdown

The project will be divided into 3 sprints of 5 days each. Each sprint will focus on a set of related features, building upon the previous sprint's accomplishments.

| Sprint | Duration | Focus                                                                | Key Deliverables                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | -------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | 5 days   | Initial Setup, Student Registration, and Simulated Integrations      | Backend & Frontend Setup, Student Model & Routes, Simulated Transcription & AI Exam Generation, Basic Exam Frontend                                                                                                                                                                                                                                                                                          |
| 2      | 5 days   | Exam Logic, Certificate Generation (Simulated), Starknet Integration | Exam Correction Logic, Certificate Model & Generation (Simulated), Basic Starknet Contract, NFT Minting Logic, Landing Page Skeleton                                                                                                                                                                                                                                                                         |
| 3      | 5 days   | Real Integrations, Testing, and Deployment                           | Real API Integrations (Video & AI), End-to-End Testing, Bug Fixing, Deployment to Test Environment                                                                                                                                                                                                                                                                                                         |

## 3.  Task Breakdown

Tasks are estimated in hours or days and include dependencies.  Effort is estimated for the MVP scope.

### Sprint 1: Initial Setup, Student Registration, and Simulated Integrations (5 days)

| Task                                                                  | Estimate | Dependencies | Critical Path |
| --------------------------------------------------------------------- | -------- | ------------ | ------------- |
| 1.1 Backend Setup (Node, Express, DB)                                   | 8 hours  | None         | Yes           |
| 1.2 Frontend Setup (React)                                              | 8 hours  | None         | Yes           |
| 1.3 Student Model & Routes (Backend)                                    | 12 hours | 1.1          | Yes           |
| 1.4 Simulated Transcription Function (Backend)                          | 4 hours  | 1.1          |               |
| 1.5 Simulated AI Exam Generation Function (Backend)                     | 8 hours  | 1.4          |               |
| 1.6 Basic Exam Frontend Components (Sí/No, Multiple Choice)             | 16 hours | 1.2          |               |
| 1.7 Exam Page & Submission Logic (Frontend)                             | 12 hours | 1.6          |               |
| 1.8 Sprint 1 Testing (Unit & Integration)                               | 8 hours  | 1.3, 1.5, 1.7 |               |
| **Sprint 1 Total** | **76 hours** |              |               |

### Sprint 2: Exam Logic, Certificate Generation (Simulated), Starknet Integration (5 days)

| Task                                                                  | Estimate | Dependencies | Critical Path |
| --------------------------------------------------------------------- | -------- | ------------ | ------------- |
| 2.1 Exam Correction Logic (Backend)                                     | 12 hours | 1.3, 1.7     | Yes           |
| 2.2 Certificate Model & Generation (Simulated) (Backend)                | 12 hours | 2.1          | Yes           |
| 2.3 Basic Starknet Contract (Cairo)                                     | 16 hours | None         | Yes           |
| 2.4 NFT Minting Logic (Backend)                                       | 12 hours | 2.2, 2.3     |               |
| 2.5 Landing Page Skeleton (Frontend)                                  | 8 hours  | 1.2          |               |
| 2.6 Sprint 2 Testing (Unit & Integration)                               | 8 hours  | 2.2, 2.4, 2.5 |               |
| **Sprint 2 Total** | **68 hours** |              |               |

### Sprint 3: Real Integrations, Testing, and Deployment (5 days)

| Task                                                                  | Estimate | Dependencies     | Critical Path |
| --------------------------------------------------------------------- | -------- | ---------------- | ------------- |
| 3.1 Real Video API Integration (Backend)                              | 20 hours | 1.4              | Yes           |
| 3.2 Real AI API Integration (Backend)                                 | 20 hours | 1.5              | Yes           |
| 3.3 End-to-End Testing                                                | 20 hours | 3.1, 3.2, Sprint 2 | Yes           |
| 3.4 Bug Fixing & Refinement                                           | 12 hours | 3.3              |               |
| 3.5 Deployment to Test Environment                                    | 8 hours  | 3.4              |               |
| **Sprint 3 Total** | **80 hours** |                  |               |

**Total Estimated Effort:** 224 hours (Approximately 28 days of work for an individual, indicating a team is necessary to meet the 15-day goal)

## 4.  Critical Path Items

1.  **Backend & Frontend Setup and Student Model (Sprint 1):** Foundation for all other features.
2.  **Exam Correction and Simulated Certificate Generation (Sprint 2):** Core logic for certification flow.
3.  **Real API Integrations and End-to-End Testing (Sprint 3):** Ensuring functionality and stability.

## 5.  Testing Strategy (MVP)

* **Unit Tests:** For backend logic (exam correction, certificate generation).
* **Integration Tests:**
    * Frontend <-> Backend (student registration, exam submission, result display).
    * Backend <-> Simulated APIs (transcription, AI).
    * Backend <-> Starknet (NFT minting - basic smoke test).
* **End-to-End Tests (Sprint 3):** Simulate a user flow (registration, exam, certificate viewing).

## 6.  Deployment Milestones

* **End of Sprint 1:** Deployable version with student registration and simulated exam flow.
* **End of Sprint 2:** Deployable version with simulated certificate generation and basic Starknet integration.
* **End of Sprint 3:** Final MVP deployable to a test environment.

## 7.  Risk Mitigation Plan

| Risk                                                                  | Mitigation Strategy |
| --------------------------------------------------------------------- | -------- | 
| 3.1 Real Video API Integration (Backend)                              | 20 hours |