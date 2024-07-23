import { type AsyncStateObject } from './common'

export interface DashboardState {
  coacheeGoalSummary: AsyncStateObject<CoacheeGoalSummaryDto[]>
  coachGoalSummary: AsyncStateObject<CoachGoalSummaryDto[]>
  coacheeSessionSummary: AsyncStateObject<CoacheeSessionSummaryDto[]>
  coachSessionSummary: AsyncStateObject<CoachSessionSummaryDto[]>
  coacheeRecentEngagement: AsyncStateObject<RecentEngagementAsCoacheeResponse | null>
  coachRecentEngagement: AsyncStateObject<RecentEngagementAsCoachResponse | null>
  coacheeStats: AsyncStateObject<CoacheeStatsResponse | null>
  coachStats: AsyncStateObject<CoachStatsResponse | null>
  supervisorStats: AsyncStateObject<SupervisorStatsResponse | null>
}

export interface DashboardStatChartDto {
  total: number
  pending: number
  rejected: number
  accepted: number
  assigned: number
  inProgress: number
  completed: number
}

export interface DashboardRecentEngagementDto {
  _id: string
  name: string
  endDate: string
  totalSessions: number
  sessionsLeft: number
  sessionCompletedPercentage: number
  coaches: RecentEngagementCoach[]
}

export interface DashboardSessionSummaryDto {
  engagementId: string
  sessionId: string
  name: string
  sessionType: string
  sessionDuration: string
  status: string
}

export interface DashboardGoalSummaryDto {
  _id: string
  name: string
  priority: string
  priorityId: number
  startDate: string
  endDate: string
  status: string
  statusId: number
}

export interface DashboardEngagementSummaryDto {
  _id: string
  name: string
  startDate: string
  endDate: string
  status: string
  statusId: number
  isIndividual: boolean
}

export interface CoacheeStatsResponse {
  sessions: {
    totalSessions: number
    newSessions: number
    inProgressSessions: number
    completedSessions: number
  }
  goals: {
    totalGoals: number
    pendingGoals: number
    rejectedGoals: number
    acceptedGoals: number
    assignedGoals: number
    inProgressGoals: number
    completedGoals: number
  }
}

export interface CoachStatsResponse {
  engagements: {
    totalEngagements: number
    pendingEngagements: number
    inProgressEngagements: number
    completedEngagements: number
  }
  goals: {
    totalGoals: number
    pendingGoals: number
    rejectedGoals: number
    acceptedGoals: number
    assignedGoals: number
    inProgressGoals: number
    completedGoals: number
  }
}

export interface SupervisorStatsResponse {
  engagements: {
    totalEngagements: number
    pendingEngagements: number
    inProgressEngagements: number
    completedEngagements: number
  }
  goals: {
    totalGoals: number
    pendingGoals: number
    rejectedGoals: number
    acceptedGoals: number
    assignedGoals: number
    inProgressGoals: number
    completedGoals: number
  }
}

export interface CoachGoalSummaryRequestParam {
  statusId?: number
  limit: number
}

export interface CoachGoalSummaryDto {
  _id: string
  name: string
  priority: string
  priorityId: number
  startDate: string
  endDate: string
  status: string
  statusId: number
}

export interface CoacheeGoalSummaryRequestParam {
  statusId?: number
  limit: number
}

export interface CoacheeGoalSummaryDto {
  _id: string
  name: string
  priority: string
  priorityId: number
  startDate: string
  endDate: string
  status: string
  statusId: number
}

export interface CoachSessionSummaryRequestParam {
  limit: number
}

export interface CoachSessionSummaryDto {
  engagementId: string
  sessionId: string
  name: string
  sessionType: string
  sessionDuration: string
  status: string
}

export interface CoacheeSessionSummaryRequestParam {
  limit: number
}

export interface CoacheeSessionSummaryDto {
  engagementId: string
  sessionId: string
  name: string
  sessionType: string
  sessionDuration: string
  status: string
}

export interface RecentEngagementAsCoachResponse {
  _id: string
  name: string
  endDate: string
  totalSessions: number
  sessionsLeft: number
  sessionCompletedPercentage: number
  coaches: RecentEngagementCoach[]
}

export interface RecentEngagementAsCoacheeResponse {
  _id: string
  name: string
  endDate: string
  totalSessions: number
  sessionsLeft: number
  sessionCompletedPercentage: number
  coaches: RecentEngagementCoach[]
}

export interface RecentEngagementCoach {
  id: string
  name: string
}
