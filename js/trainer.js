let trainer = {
  isActive: true,
  preCount: false,
  period: 4,
  break: 0,
  breakCounter: 0,
  isOnBreak: false,
  increment: 1,
  limit: 220,
  getStatus() {
    return this.isActive
  },
  toggleStatus() {
    this.isActive = !this.getStatus()
  }
}