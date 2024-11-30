# Move files back to their original locations
# Auth related
Move-Item -Path "src/app/features/auth/login/*" -Destination "src/app/pages/login/" -Force
Move-Item -Path "src/app/features/auth/register/*" -Destination "src/app/pages/creat-account/" -Force
Move-Item -Path "src/app/features/auth/forgot-password/*" -Destination "src/app/pages/forgot-your-password/" -Force

# Dashboard
Move-Item -Path "src/app/features/dashboard/components/*" -Destination "src/app/pages/dashboard/" -Force

# User related
Move-Item -Path "src/app/features/user/profile/*" -Destination "src/app/pages/userprofile/" -Force
Move-Item -Path "src/app/features/user/settings/*" -Destination "src/app/pages/user-data/" -Force

# Services
Move-Item -Path "src/app/core/services/*" -Destination "src/app/pages/services/" -Force

# Guards
Move-Item -Path "src/app/core/guards/*" -Destination "src/app/guard/" -Force

# Models
Move-Item -Path "src/app/core/models/*" -Destination "src/app/pages/model/" -Force

# Shared components
Move-Item -Path "src/app/shared/components/*" -Destination "src/app/pages/shared/" -Force

# Operational
Move-Item -Path "src/app/features/operational/components/*" -Destination "src/app/pages/operational/" -Force

# Clean up empty directories
Remove-Item -Path "src/app/core" -Recurse -Force
Remove-Item -Path "src/app/shared" -Recurse -Force
Remove-Item -Path "src/app/features" -Recurse -Force
Remove-Item -Path "src/app/layout" -Recurse -Force
