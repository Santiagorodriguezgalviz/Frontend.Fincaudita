# Create new directory structure
$directories = @(
    "src/app/core/guards",
    "src/app/core/interceptors",
    "src/app/core/services",
    "src/app/core/models",
    "src/app/shared/components",
    "src/app/shared/directives",
    "src/app/shared/pipes",
    "src/app/shared/utils",
    "src/app/features/auth/login",
    "src/app/features/auth/register",
    "src/app/features/auth/forgot-password",
    "src/app/features/dashboard/components",
    "src/app/features/dashboard/services",
    "src/app/features/operational/components",
    "src/app/features/operational/services",
    "src/app/features/user/profile",
    "src/app/features/user/settings",
    "src/app/layout/main-layout",
    "src/app/layout/auth-layout",
    "src/app/assets/images",
    "src/app/assets/icons",
    "src/app/assets/styles"
)

foreach ($dir in $directories) {
    New-Item -Path $dir -ItemType Directory -Force
}

# Move existing files to new structure
# Auth related
Move-Item -Path "src/app/pages/login/*" -Destination "src/app/features/auth/login/" -Force
Move-Item -Path "src/app/pages/creat-account/*" -Destination "src/app/features/auth/register/" -Force
Move-Item -Path "src/app/pages/forgot-your-password/*" -Destination "src/app/features/auth/forgot-password/" -Force

# Dashboard
Move-Item -Path "src/app/pages/dashboard/*" -Destination "src/app/features/dashboard/components/" -Force

# User related
Move-Item -Path "src/app/pages/userprofile/*" -Destination "src/app/features/user/profile/" -Force
Move-Item -Path "src/app/pages/user-data/*" -Destination "src/app/features/user/settings/" -Force

# Services
Move-Item -Path "src/app/pages/services/*" -Destination "src/app/core/services/" -Force

# Guards
Move-Item -Path "src/app/guard/*" -Destination "src/app/core/guards/" -Force

# Models
Move-Item -Path "src/app/pages/model/*" -Destination "src/app/core/models/" -Force

# Shared components
Move-Item -Path "src/app/pages/shared/*" -Destination "src/app/shared/components/" -Force
Move-Item -Path "src/app/pages/svgs/*" -Destination "src/app/shared/components/" -Force

# Operational
Move-Item -Path "src/app/pages/operational/*" -Destination "src/app/features/operational/components/" -Force

# Assets
Move-Item -Path "src/app/assets/*" -Destination "src/app/assets/images/" -Force
